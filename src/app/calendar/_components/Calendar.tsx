"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "event 1", date: "2019-04-01" },
        { title: "event 2", date: "2019-04-02" },
      ]}
    />
  );
};

export default Calendar;
