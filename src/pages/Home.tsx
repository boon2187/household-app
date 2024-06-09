import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { format } from "date-fns";
import { Schema } from "../validations/schema";

// Propsの型定義
interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
}

const Home = ({
  monthlyTransactions,
  setCurrentMonth,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
}: HomeProps) => {
  // 今日の日付を取得
  const today = format(new Date(), "yyyy-MM-dd");
  // 選択した日付をいれるstate
  const [currentDay, setCurrentDay] = useState(today);
  // TransactionMenuの表示非表示を切り替えるstate
  const [isEntryDraweOpen, setIsEntryDraweOpen] = useState(false);
  // currentDayの日付の取引履歴を取得
  const dailyTransactions = monthlyTransactions.filter(
    (transaction) => transaction.date === currentDay
  );
  // TransctionFormの閉じるボタンを押した時の処理
  const closeForm = () => {
    // 閉じるボタンが押されたら、選択した取引をリセットし、フォームを閉じる
    // そうしないと、選択した取引が残ったままになって、内訳追加ボタンを押してもフォームが開かない
    setIsEntryDraweOpen(!isEntryDraweOpen);
    setSelectedTransaction(null);
  };

  // フォームの開閉処理
  const handleAddTransctionForm = () => {
    // 取引が選択された状態で、「内訳を追加」ボタンを押したら、取引がリセットされる
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      // 取引が選択されたなければ、フォームの開閉処理を行う
      setIsEntryDraweOpen(!isEntryDraweOpen);
    }
  };

  // 取引をクリックした時の処理
  const handleSelectTransaction = (transaction: Transaction) => {
    // フォームを開く(開きっぱなしなのでture)
    setIsEntryDraweOpen(true);
    // 選択した取引を保存
    setSelectedTransaction(transaction);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransctionForm={handleAddTransctionForm}
          onSelectTransaction={handleSelectTransaction}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDraweOpen={isEntryDraweOpen}
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
        />
      </Box>
    </Box>
  );
};

export default Home;
