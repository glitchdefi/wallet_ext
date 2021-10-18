/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { translations } from '../../../locales/translations';
import { _t } from '../../../utils/message';

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
  password: () => _t(translations.password.title),
  confirmPassword: () => _t(translations.password.confirm_password),
  enterPassword: () => _t(translations.password.enter_password),
  reEnterPassword: () => _t(translations.password.re_enter_password),
  warningPassword: () =>
    _t(translations.createWalletPage.please_remember_this_password),
  termAndServices: () => _t(translations.common.term_and_service),
  setupPassword: () => _t(translations.createWalletPage.set_up_password),
  iUnderstandThatGlitch: () =>
    _t(translations.createWalletPage.i_understand_that_glitch),
  iAgreeToThe: () => _t(translations.createWalletPage.i_agree_to_the),
  confirmPasswordNotMatch: () =>
    _t(translations.password.password_confirmation_not_match),
};
