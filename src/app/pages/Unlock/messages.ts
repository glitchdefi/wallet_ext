import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  title: () => _t(translations.welcomePage.a_crypto_wallet_for_defi),
  lockedMsg: () => _t(translations.unlockPage.your_wallet_is_currently_locked),
  glitchPassword: () => _t(translations.unlockPage.glitch_password),
  password: () => _t(translations.password.title),
  unlock: () => _t(translations.unlockPage.unlock),
  restoreWallet: () => _t(translations.common.restore_wallet),
  or: () => _t(translations.common.or),
  incorrectPassword: () => _t(translations.password.incorrect_password),
};
