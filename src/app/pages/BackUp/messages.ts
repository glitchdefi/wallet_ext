import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  stepOneTitle: () => _t(translations.password.create_a_password),
  stepOneDesc: () => _t(translations.createWalletPage.protect_your_wallet),
  stepTwoTitle: () => _t(translations.common.mnemonic_phrase),
  stepTwoDesc: () =>
    _t(translations.createWalletPage.please_write_down_these_12_words),
  stepThreeTitle: () => _t(translations.createWalletPage.verify_your_mnemonic),
  stepThreeDesc: () =>
    _t(translations.createWalletPage.enter_the_following_words),
};
