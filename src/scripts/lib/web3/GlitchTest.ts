import log from 'loglevel';
import keyring from '@polkadot/ui-keyring';
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} from '@polkadot/util-crypto';
import { CreateResult } from '@polkadot/ui-keyring/types';

import { DEFAULT_TYPE } from 'constants/values';
import { GlitchToken } from '../../../constants/tokens';
import { getAvatar } from 'utils/drawAvatar';
import { u8aToHex } from '@polkadot/util';
import { messageEncryption } from 'utils/strings';

log.setDefaultLevel('debug');

export class GlitchTest {
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    cryptoWaitReady().then(() => {
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

  unlockAccount(password: string, address: string) {
    try {
      const pair = keyring.getPair(address);
      pair.unlock(password);

      return true;
    } catch (error) {
      return false;
    }
  }

  getPrivateKeyFromSeed(seed: string) {
    // Create valid Substrate-compatible seed from mnemonic
    const miniSecret = mnemonicToMiniSecret(seed);
    const { secretKey } = naclKeypairFromSeed(miniSecret);

    return u8aToHex(secretKey.subarray(0, 32));
  }
}
