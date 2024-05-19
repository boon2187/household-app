import { Balance, Transaction } from "../types";

// transactionsの配列を受け取り、収入、支出、残高を集計する関数
export function financeCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );
}

// 1. 日付ごとの収支を集計する関数
// 返す値の例
// {
//   "2022-01-01": {
//     income: 1000,
//     expense: 500,
//     balance: 500,
//   },
//   "2022-01-02": {
//     income: 2000,
//     expense: 1000,
//     balance: 1000,
//   },
// }
export function calculateDailyBalances(
  transactions: Transaction[]
): Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }

    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else {
      acc[day].expense += transaction.amount;
    }
    acc[day].balance = acc[day].income - acc[day].expense;
    return acc;
  }, {});
}
