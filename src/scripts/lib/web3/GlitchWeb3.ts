import log from 'loglevel';
import keyring from '@polkadot/ui-keyring';
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import web3Utils from 'web3-utils';
import secrets from 'secrets';

import { DEFAULT_TYPE } from 'constants/values';
import { GlitchToken } from '../../../constants/tokens';
import { getAvatar } from 'utils/drawAvatar';
import { messageEncryption, privateKeyValidate } from 'utils/strings';
import { RequestWalletCreate } from 'scripts/types';

log.setDefaultLevel('debug');

export class GlitchWeb3 {
  api: ApiPromise;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    cryptoWaitReady().then(async () => {
      try {
        // Initialise the provider to connect to the local node
        const provider = new WsProvider(secrets.wsProvider);

        // Create the API and wait until ready
        const api = await ApiPromise.create({ provider });

        // Retrieve the chain & node information information via rpc calls
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ]);

        this.api = api;

        log.info(
          `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
        );

        // load all available addresses and accounts
        keyring.loadAll({ ss58Format: 42, type: DEFAULT_TYPE });
        log.info('Glitch Wallet initialization complete.');
      } catch (error) {
        log.info('initError', error);
      }
    });
  }

  async createAccount(request: RequestWalletCreate): Promise<{
    mnemonicEncrypted: { encrypted: string; secret: string };
    json: KeyringPair$Json;
  }> {
    const { seed, name, password } = request;
    const mnemonic =
      seed?.trim() || mnemonicGenerate(GlitchToken.default_mnemonic_length);

    const { json } = keyring.addUri(mnemonic, password || undefined, {
      avatar: getAvatar(),
      name,
      isHidden: true,
    });

    const mnemonicEncrypted = await messageEncryption(mnemonic);

    return { mnemonicEncrypted, json };
  }

  editAccount(name: string, address: string, isHidden?: boolean) {
    const pair = keyring.getPair(address);

    if (pair) {
      keyring.saveAccountMeta(pair, { ...pair.meta, name, isHidden });
      return true;
    }

    return false;
  }

  unlockAccount(password?: string, address?: string) {
    try {
      const pair = keyring.getPair(address);
      pair.unlock(password);

      return true;
    } catch (error) {
      return false;
    }
  }

  async getBalance(address: string) {
    const { data: balance } = await this.api.query.system.account(address);
    return {
      freeBalance: `${balance.free ? `${balance.free}` : '0'}`,
      reservedBalance: `${balance.reserved ? `${balance.reserved}` : '0'}`,
    };
  }

  async getEstimateFee(
    fromAddress: string,
    toAddress: string,
    _amount: string
  ) {
    try {
      const amount = web3Utils.toWei(_amount).toString();
      const { partialFee } = await this.api.tx.balances
        .transfer(toAddress, amount)
        .paymentInfo(fromAddress);

      return web3Utils.fromWei(partialFee);
    } catch (e: any) {
      log.info('getEstimateFeeError:', e);
      throw new Error((e as Error).message);
    }
  }

  async transfer(
    fromAddress: string,
    toAddress: string,
    _amount: string,
    onFailedCb: (msg: string) => void,
    onSuccessCb: () => void
  ) {
    try {
      // Find the actual keypair in the keyring
      const fromAddressPair = keyring.getPair(fromAddress);
      const amount = web3Utils.toWei(_amount).toString();

      log.info(
        'Sending',
        _amount,
        'from',
        fromAddressPair.address,
        'to',
        toAddress
      );

      await this.api.tx.balances
        .transfer(toAddress, amount)
        .signAndSend(fromAddressPair, ({ dispatchError, isCompleted }) => {
          // status would still be set, but in the case of error we can shortcut
          // to just check it (so an error would indicate InBlock or Finalized)
          if (dispatchError) {
            if (dispatchError.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = this.api.registry.findMetaError(
                dispatchError.asModule
              );
              const { docs, name, section } = decoded;
              const msg = docs.join(' ');
              const codeError = `${section}.${name}`;

              log.info(`${codeError}: ${msg}`);

              onFailedCb(
                codeError === 'balances.InsufficientBalance'
                  ? 'Insufficient funds'
                  : codeError === 'balances.ExistentialDeposit'
                  ? 'The amount should be larger than 0.0005 GLCH.'
                  : msg
              );
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              log.info('dispatchError', dispatchError.toString());
              onFailedCb(dispatchError.toString());
            }
          }

          if (!dispatchError && isCompleted) {
            log.info('Transfer success');
            onSuccessCb();
          }
        });
    } catch (e: any) {
      log.info('Transfer Error:', e);
      throw new Error((e as Error).message);
    }
  }

  getPrivateKeyFromSeed(seed: string) {
    if (privateKeyValidate(seed)) {
      return seed;
    }

    // Create valid Substrate-compatible seed from mnemonic
    const miniSecret = mnemonicToMiniSecret(seed);
    const { secretKey } = naclKeypairFromSeed(miniSecret);

    return u8aToHex(secretKey.subarray(0, 32));
  }
}
