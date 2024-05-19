import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";

import React from "react";
import { EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CalendarContent, Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";

// Propsの型定義
interface CalendarProps {
  monthlyTransactions: Transaction[];
}

function Calendar({ monthlyTransactions }: CalendarProps) {
  // 日付ごとの集計を受けてFullCalendar用のイベントを生成する関数
  // 引数：日付ごとの収支の集計
  // 返り値：FullCalendar用のイベントの配列
  // [{ start: "2024-05-21", income: 300, expense: 100, balance: 200,},
  //  { start: "2024-05-22", income: 500, expense: 200, balance: 300,}]
  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  // 日付ごとの収支を集計
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

  const events = [
    {
      title: "Meeting",
      start: "2024-05-21",
      income: 300,
      expense: 100,
      balance: 200,
    },
  ];

  // eventsの中のカスタムPropsを取得する
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}円
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}円
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}円
        </div>
      </div>
    );
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
}

export default Calendar;
