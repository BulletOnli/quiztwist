"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type CalendarProps = {
  events:
    | [
        {
          _id: string;
          room: {
            _id: string;
            students: string[];
          };
          deadline: Date;
          title: string;
        }
      ]
    | [];
};

const Calendar = ({ events }: CalendarProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events.map((event) => ({
        title: event.title,
        date: event.deadline,
      }))}
    />
  );
};

export default Calendar;
