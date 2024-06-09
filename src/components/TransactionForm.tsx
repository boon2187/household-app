import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeOutlined from "@mui/icons-material/AddHomeOutlined";
import TrainIcon from "@mui/icons-material/Train";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WorkIcon from "@mui/icons-material/Work";
import AddBuisinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { expenseCategory, incomeCategory, Transaction } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDraweOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
}

// typeの型定義
type IncomeExpense = "income" | "expense";

// カテゴリーの型定義
interface CategoryItem {
  label: incomeCategory | expenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDraweOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;

  // カテゴリーの配列を作成
  //   支出用のカテゴリー
  const expenseCategories: CategoryItem[] = useMemo(
    () => [
      { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
      { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
      { label: "住居費", icon: <AddHomeOutlined fontSize="small" /> },
      { label: "交通費", icon: <TrainIcon fontSize="small" /> },
      { label: "交際費", icon: <Diversity3Icon fontSize="small" /> },
      { label: "娯楽", icon: <SportsTennisIcon fontSize="small" /> },
      { label: "その他", icon: <MoreHorizIcon fontSize="small" /> },
    ],
    []
  );

  //   収入用のカテゴリー
  const incomeCategories: CategoryItem[] = useMemo(
    () => [
      { label: "給与", icon: <WorkIcon fontSize="small" /> },
      { label: "副収入", icon: <AddBuisinessIcon fontSize="small" /> },
      { label: "お小遣い", icon: <SavingsIcon fontSize="small" /> },
      { label: "その他", icon: <MoreHorizIcon fontSize="small" /> },
    ],
    []
  );

  // 現在のカテゴリーを保持するステート
  const [categories, setCategories] =
    useState<CategoryItem[]>(expenseCategories);

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "食費",
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });
  console.log(errors);

  // 収支切り替え関数
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
    setValue("category", type === "expense" ? "食費" : "給与");
  };

  // typeの値を監視・現在が収入か支出かを取得
  const currentType = watch("type"); // watch関数を呼び出すことで、フォームの値を監視する

  // useEffectを使って、typeの値が変わったときにカテゴリーを切り替える
  useEffect(() => {
    const newCategories =
      currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType, expenseCategories, incomeCategories]);

  // 日付が変わったときのreact-hook-formのsetValue関数を使って日付を更新
  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay, setValue]);

  // フォームが送信されたときの処理
  const onSubmit: SubmitHandler<Schema> = (data) => {
    // console.log(data);
    onSaveTransaction(data);
    // 送信後、フォームの内容をリセットする
    // 日付だけはリセットしない
    reset({
      date: currentDay,
      amount: 0,
      content: "",
      type: "expense",
      category: "食費",
    });
  };

  // 取引が選択されたときの処理
  useEffect(() => {
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("category", selectedTransaction.category);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        date: currentDay,
        amount: 0,
        content: "",
        category: "食費",
        type: "expense",
      });
    }
  }, [selectedTransaction, setValue, currentDay, reset]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDraweOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  color="primary"
                  variant={field.value === "income" ? "contained" : "outlined"}
                  onClick={() => incomeExpenseToggle("income")}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
                {categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    value={category.label}
                    onClick={() => setValue("category", category.label)}
                  >
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />
          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
