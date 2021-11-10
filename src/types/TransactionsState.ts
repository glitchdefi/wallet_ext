export type TransactionItemType = {
  create_at?: string;
  data_mode?: any;
  data_name?: number;
  data_op?: number;
  data_params?: string;
  data_src?: string;
  from?: number;
  gaslimit?: number;
  gasused?: string;
  hash?: string;
  height?: string;
  index?: string;
  nonce?: number;
  payer?: string;
  result_code?: string;
  result_data?: string;
  result_log?: number;
  returnvalue?: string;
  to?: string;
  type?: string;
  value?: string;
};
export interface TransactionsState {
  transactions?: TransactionItemType[];
  isFetchingTransactions?: boolean;
  isTransferSuccess?: boolean;
  transactionsError?: any;
  totalTransactions?: number;
}
