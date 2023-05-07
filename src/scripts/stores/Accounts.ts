import type { KeyringJson, KeyringStore } from 'packages/glitch-keyring/types';
import { EXTENSION_PREFIX } from 'constants/messages';
import BaseStore from './Base';

export default class AccountsStore
  extends BaseStore<KeyringJson>
  implements KeyringStore
{
  constructor() {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}accounts` : null);
  }

  public override set(
    key: string,
    value: KeyringJson,
    update?: () => void
  ): void {
    // shortcut, don't save testing accounts in extension storage
    if (key.startsWith('account:') && value.meta && value.meta.isTesting) {
      update && update();

      return;
    }

    super.set(key, value, update);
  }
}
