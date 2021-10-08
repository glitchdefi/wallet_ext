/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { translations } from '../../../locales/translations';
import { _t } from '../../../utils/message';

export const messages = {
  needHelpContact: () => _t(translations.common.need_help_contact),
  glchFinanceSupport: () => _t(translations.common.glitch_finance_support),
};
