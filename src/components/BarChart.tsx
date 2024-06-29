import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Transaction } from "../types";
import { useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
}

const BarChart = ({ monthlyTransactions }: BarChartProps) => {
  // テーマの読み込み
  const theme = useTheme();
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: "right" as const,
      // },
      title: {
        display: true,
        text: "日別収支",
      },
    },
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // console.log(dailyBalances);
  // console.log(monthlyTransactions);

  // 日付の配列を作成(label作成のため)
  const dateLabels = Object.keys(dailyBalances).sort();

  // 支出データの配列を作成
  const expenseData = dateLabels.map((date) => dailyBalances[date].expense);

  // 収入データの配列を作成
  const incomeData = dateLabels.map((date) => dailyBalances[date].income);

  const data: ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: "支出",
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
      {
        label: "収入",
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
