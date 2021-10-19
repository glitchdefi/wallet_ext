import { translations } from '../../../locales/translations';
import { _t } from '../../../utils/message';

export const messages = {
  title: () => _t(translations.welcomePage.a_crypto_wallet_for_defi),
  createWallet: () => _t(translations.common.create_wallet),
  restoreWallet: () => _t(translations.common.restore_wallet),
};
