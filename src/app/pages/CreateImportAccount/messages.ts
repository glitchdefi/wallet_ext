import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  title: () => _t(translations.createImportAccountPage.title),
  cancel: () => _t(translations.common.cancel),
  create: () => _t(translations.common.create),
  import: () => _t(translations.common.import),
  account: () => _t(translations.common.account),
  privateKeys: () => _t(translations.common.private_keys),
  createAccount: () => _t(translations.createImportAccountPage.create_account),
  importPrivateKeys: () =>
    _t(translations.createImportAccountPage.import_private_keys),
  importAccountWarning: () =>
    _t(translations.createImportAccountPage.import_account_warning),
  accountName: () => _t(translations.createImportAccountPage.account_name),
  enterPrivateKeys: () => _t(translations.createImportAccountPage.enter_private_key),
  invalidPrivateKeys: () => _t(translations.createImportAccountPage.invalid_private_keys),
};
