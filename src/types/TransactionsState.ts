export type TransactionItemType = {
  time?: string;
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
  returnvalue?: string;
  to?: string;
  type?: string;
  value?: string;
  status?: string;
};
export interface TransactionsState {
  transactions?: TransactionItemType[];
  isFetchingTransactions?: boolean;
  isTransferSuccess?: boolean;
  transactionsError?: any;
  totalTransactions?: number;
}
