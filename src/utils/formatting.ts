import { format } from "date-fns";

export function formatMonth(date: Date): string {
  return format(date, "yyyy-MM");
}

// 数値を日本円に変換する関数
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}
