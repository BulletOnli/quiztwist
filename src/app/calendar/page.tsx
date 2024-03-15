import React from "react";
import Calendar from "./_components/Calendar";
import { getAllEvents } from "@/lib/actions/calendar.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Calendar",
};

const CalendarPage = async () => {
  const events = await getAllEvents();

  return (
    <div className="w-full flex flex-col p-10">
      <Calendar events={events} />
    </div>
  );
};

export default CalendarPage;
