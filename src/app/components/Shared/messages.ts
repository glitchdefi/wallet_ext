import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
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
  download: () => _t(translations.common.download),
  copy: () => _t(translations.common.copy),
  confirm: () => _t(translations.common.confirm),
  iWroteDownMnemonic: () =>
    _t(translations.mnemonicPhrase.i_wrote_down_mnemonic),
  neverShareYourMnemonic: () =>
    _t(translations.mnemonicPhrase.never_share_your_mnemonic_phrase),
  invalidMnemonicPhrase: () =>
    _t(translations.mnemonicPhrase.invalid_mnemonic_phrase),
};
