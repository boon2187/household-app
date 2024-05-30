import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { format } from "date-fns";

// Propsの型定義
interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
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
    setIsEntryDraweOpen(!isEntryDraweOpen);
  };

  // フォームの開閉処理
  const handleAddTransctionForm = () => {
    setIsEntryDraweOpen(!isEntryDraweOpen);
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
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDraweOpen={isEntryDraweOpen}
          currentDay={currentDay}
        />
      </Box>
    </Box>
  );
};

export default Home;
