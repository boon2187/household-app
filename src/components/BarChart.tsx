import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Transaction } from "../types";

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
  const dateLabels = Object.keys(dailyBalances);
  // console.log(dateLabels);

  // 支出データの配列を作成
  const expenseData = dateLabels.map((date) => dailyBalances[date].expense);
  console.log(expenseData);
  // 収入データの配列を作成
  const incomeData = dateLabels.map((date) => dailyBalances[date].income);
  console.log(incomeData);

  const labels = [
    "2024-05-10",
    "2024-05-15",
    "2024-05-20",
    "2024-05-25",
    "2024-05-30",
    "2024-06-05",
    "2024-06-10",
  ];

  const data = {
    dateLabels,
    datasets: [
      {
        label: "支出",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "収入",
        data: incomeData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
