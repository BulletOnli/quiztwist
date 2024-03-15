"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events.map((event) => ({
        title: event.title,
        date: event.deadline,
        url: `/r/${event.room._id}/quiz/${event._id}/questions`,
      }))}
      // eventContent={renderEventContent}
    />
  );
};

// function renderEventContent(eventInfo: any) {
//   console.log(eventInfo);

//   return (
//     <div className="w-full flex items-center gap-2 bg-secondary p-2">
//       <b>{eventInfo.timeText}m</b>
//       <i>{eventInfo.event.title}</i>
//     </div>
//   );
// }

export default Calendar;
