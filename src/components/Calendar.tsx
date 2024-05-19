import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";

import React from "react";
import { EventContentArg } from "@fullcalendar/core";

function Calendar() {
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
