import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  title: () => _t(translations.common.restore_wallet),
  stepOneTitle: () =>
    _t(translations.restoreWalletPage.restore_wallet_from_mnemonic),
  stepOneDesc: () =>
    _t(translations.restoreWalletPage.you_already_have_a_wallet),

  stepTwoTitle: () => _t(translations.password.create_a_password),
  stepTwoDesc: () => _t(translations.createWalletPage.protect_your_wallet),

  mnemonic: () => _t(translations.mnemonicPhrase.mnemonic),
  enterYourMnemonic: () => _t(translations.mnemonicPhrase.enter_your_mnemonic),
  mnemonicContainInvalidWords: () =>
    _t(translations.mnemonicPhrase.mnemonic_phrase_contain_invalid_words),
  startRestore: () => _t(translations.restoreWalletPage.start_restore),
};
