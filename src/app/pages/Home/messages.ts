import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  title: () => _t(translations.welcomePage.a_crypto_wallet_for_defi),
  createWallet: () => _t(translations.common.create_wallet),
  restoreWallet: () => _t(translations.common.restore_wallet),
  accountDetails: () => _t(translations.common.account_details),
  showPrivateKey: () => _t(translations.privateKey.show_private_key),
  importPrivateKey: () => _t(translations.privateKey.import_private_key),
  manageAccount: () => _t(translations.accounts.manage_account),
  createAccount: () => _t(translations.accounts.create_account),
  settings: () => _t(translations.settings.title),
  language: () => _t(translations.settings.language),
  currency: () => _t(translations.settings.currency),
  autoLockTimer: () => _t(translations.settings.auto_lock_timer),
  aboutGlitch: () => _t(translations.settings.about_glitch),
  logout: () => _t(translations.common.logout),
  connectedDapps: () => _t(translations.connected_dapps),
  revealMnemonicPhrase: () =>
    _t(translations.mnemonicPhrase.reveal_mnemonic_phrase),
  yourWalletNotBackup: () =>
    _t(translations.mnemonicPhrase.your_wallet_is_not_backup),
};
