export type TransactionType = "income" | "expense";
export type incomeCategory = "給与" | "副収入" | "お小遣い" | "その他";
export type expenseCategory =
  | "食費"
  | "日用品"
  | "住居費"
  | "交通費"
  | "交際費"
  | "娯楽"
  | "その他";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: incomeCategory | expenseCategory;
}
