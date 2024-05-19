import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
// import "../calendar.css";

import React from "react";

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
