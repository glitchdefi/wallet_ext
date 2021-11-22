/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  title: () => _t(translations.createWalletPage.title),
  stepOneTitle: () => _t(translations.password.create_a_password),
  stepOneDesc: () => _t(translations.createWalletPage.protect_your_wallet),
  stepTwoTitle: () => _t(translations.common.mnemonic_phrase),
  stepTwoDesc: () =>
    _t(translations.createWalletPage.please_write_down_these_12_words),
  stepThreeTitle: () => _t(translations.createWalletPage.verify_your_mnemonic),
  stepThreeDesc: () =>
    _t(translations.createWalletPage.enter_the_following_words),
};
