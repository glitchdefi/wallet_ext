type TransactionItem = {
  txHash: string;
  method: string;
  block: number;
  timestamp: number;
  from: string;
  to: string;
  value: number;
  fee: number;
  status: string;
};
export interface TransactionsState {
  transactions?: TransactionItem[];
}
