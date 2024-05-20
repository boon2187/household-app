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
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";

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

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

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
