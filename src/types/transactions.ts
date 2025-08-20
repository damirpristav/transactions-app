import type { Category } from './categories';

export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date | null;
  category_id: string;
  category: Category;
};

export type TransactionsRequestParams = {
  page: number;
  latest?: boolean;
  fromDate?: Date;
  toDate?: Date;
};

export type Summary = {
  total_income: number | null;
  total_expense: number | null;
};

export type SummaryRequestParams = {
  latest?: boolean;
  fromDate?: Date;
  toDate?: Date;
};

export type AddTransactionData = {
  category_id: number | null;
  amount: string;
  type: TransactionType | '';
  description: string;
  date: Date | null;
};

export type AddTransactionMutationData = Omit<AddTransactionData, 'date'> & {
  date: string;
};
