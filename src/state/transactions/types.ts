interface Transactions {
  id: number;
  name: string;
}

export interface Wallet {
  transactions: Transactions[];
  balance: number;
}
