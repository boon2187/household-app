import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付を入力してください" }),
  amount: z.number().min(1, { message: "金額を入力してください" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内で入力してください" }),
  category: z
    .union([
      z.enum([
        "食費",
        "日用品",
        "住居費",
        "交通費",
        "交際費",
        "娯楽",
        "その他",
      ]),
      z.enum(["給与", "副収入", "お小遣い", "その他"]),
      z.literal(""),
    ])
    .refine((value) => value !== "", {
      message: "カテゴリを選択してください",
    }),
});

export type Schema = z.infer<typeof transactionSchema>;
