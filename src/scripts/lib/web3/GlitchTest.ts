import log from 'loglevel';
import keyring from '@polkadot/ui-keyring';
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} from '@polkadot/util-crypto';
import { CreateResult } from '@polkadot/ui-keyring/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import web3Utils from 'web3-utils';

import { DEFAULT_TYPE } from 'constants/values';
import { GlitchToken } from '../../../constants/tokens';
import { getAvatar } from 'utils/drawAvatar';
import { u8aToHex } from '@polkadot/util';
import { messageEncryption } from 'utils/strings';

log.setDefaultLevel('debug');

export class GlitchTest {
  api: ApiPromise;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    cryptoWaitReady().then(async () => {
      // Initialise the provider to connect to the local node
      const provider = new WsProvider('ws://13.229.207.100:9944');

      // Create the API and wait until ready
      const api = await ApiPromise.create({ provider });

      // Retrieve the chain & node information information via rpc calls
      const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version(),
      ]);

      this.api = api;

      console.log(
        `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
      );

      // load all available addresses and accounts
      keyring.loadAll({ ss58Format: 42, type: DEFAULT_TYPE });
      log.info('Glitch Test initialization complete.');
    });
  }

  async createAccount(seed: string, name: string, password: string) {
    const mnemonic =
      seed || mnemonicGenerate(GlitchToken.default_mnemonic_length);

    const { json }: CreateResult = keyring.addUri(
      mnemonic,
      password || undefined,
      {
        avatar: getAvatar(),
        name,
      }
    );

    const mnemonicEncrypted = await messageEncryption(mnemonic);

    return { mnemonicEncrypted, json };
  }

  editAccount(name: string, address: string) {
    const pair = keyring.getPair(address);

    if (pair) {
      keyring.saveAccountMeta(pair, { ...pair.meta, name });
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
    try {
      const { data: balance } = await this.api.query.system.account(address);
      return web3Utils.fromWei(`${balance.free}`);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async transfer(fromAddress: string, toAddress: string, _amount: string) {
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

      const hash = await this.api.tx.balances
        .transfer(toAddress, amount)
        .signAndSend(fromAddressPair);

      log.info('Transfer success: ', hash.toHex());
    } catch (e) {
      log.info('Transfer Error:', e);
      throw new Error((e as Error).message);
    }
  }

  getPrivateKeyFromSeed(seed: string) {
    // Create valid Substrate-compatible seed from mnemonic
    const miniSecret = mnemonicToMiniSecret(seed);
    const { secretKey } = naclKeypairFromSeed(miniSecret);

    return u8aToHex(secretKey.subarray(0, 32));
  }
}
