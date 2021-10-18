/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { translations } from '../../../locales/translations';
import { _t } from '../../../utils/message';

export const messages = {
  title: () => _t(translations.homePage.a_crypto_wallet_for_defi),
  createWallet: () => _t(translations.common.create_wallet),
  restoreWallet: () => _t(translations.common.restore_wallet),
};
