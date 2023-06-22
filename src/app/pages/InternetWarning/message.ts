import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  title: () => _t(translations.internetWarningPage.title),
  desc: () => _t(translations.internetWarningPage.desc),
  createANew: () => _t(translations.internetWarningPage.create_a_new),
  importA: () => _t(translations.internetWarningPage.import_a),
  ok: () => _t(translations.common.ok),
};
