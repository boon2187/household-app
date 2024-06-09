import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";

function App() {
  // Firestoreのエラーかどうかを判定する関数
  function isFirestoreError(
    err: unknown
  ): err is { code: string; message: string } {
    // 型ガード
    return typeof err === "object" && err !== null && "code" in err;
  }

  // 取引データを収納するステート
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 今月が何月かを保存するステート
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // firestoreからすべての取引データを取得
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        setTransactions(transactionsData);
      } catch (err) {
        // エラー処理
        if (isFirestoreError(err)) {
          console.error("firebase error", err);
        } else {
          console.error(err);
        }
      }
    };
    fetchTransactions();
  }, []);

  // 今月の取引データを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // firestoreに取引データを保存
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      // firestoreに取引データを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);

      // 新しい取引データをステートに追加
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (err) {
      // エラー処理
      if (isFirestoreError(err)) {
        console.error("firebase error", err);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
