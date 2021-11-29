import { translations } from 'locales/translations';
import { _t } from 'utils/message';

export const messages = {
  send: () => _t(translations.common.send),
  receive: () => _t(translations.common.receive),
  status: () => _t(translations.common.status),
  success: () => _t(translations.common.success),
  failed: () => _t(translations.common.failed),
  transactionHistory: () => _t(translations.transaction.history),
  txEmpty: () => _t(translations.transaction.you_have_no_tx),
  kindOfTxn: () => _t(translations.transaction.kind_of_txn),
  viewOnExplorer: () => _t(translations.transaction.view_on_glitch_explorer),
  amount: () => _t(translations.transaction.amount),
  time: () => _t(translations.transaction.time),
  txn: () => _t(translations.transaction.txn),
  filter: () => _t(translations.filter.filter),
  date: () => _t(translations.filter.date),
  selectTime: () => _t(translations.filter.select_time),
  showResults: () => _t(translations.button.show_results),
};
