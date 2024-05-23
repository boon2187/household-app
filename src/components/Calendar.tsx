import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";

import React from "react";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CalendarContent, Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns";

// Propsの型定義
interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

// 日付ごとの集計を受けてFullCalendar用のイベントを生成する関数
//    引数：日付ごとの収支の集計
//    返り値：FullCalendar用のイベントの配列
//      [{ start: "2024-05-21", income: 300, expense: 100, balance: 200,},
//        { start: "2024-05-22", income: 500, expense: 200, balance: 300,}]
function Calendar({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) {
  const theme = useTheme();

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

  // eventsの中のカスタムPropsを取得する
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  // 月が変わったときに呼ばれる関数
  const handleDatesSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    isSameMonth(new Date(), currentMonth) && setCurrentDay(today);
  };

  // 日付ごとの収支を集計
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // FullCalendar用のイベントに変換
  const calendaerEvents = createCalendarEvents(dailyBalances);

  // 日付をクリックしたときの処理
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendaerEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
    />
  );
}

export default Calendar;
