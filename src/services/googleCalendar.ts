import get0AuthClient from "@/utils/0authClient";
import authOptions from "@/utils/authOptions";
import { google } from "googleapis";
import { getServerSession } from "next-auth";

const calendarClient = async (accessToken: string) => {
  const authClient = await get0AuthClient(accessToken);

  return google.calendar({
    version: "v3",
    auth: authClient,
  });
};

export const createCalendarEvent = async (requestBody: any) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Please login first!");

  const calendar = await calendarClient(session?.accessToken);

  calendar.events.insert(
    {
      calendarId: "primary",
      requestBody,
    },
    (err: unknown, event: any) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Event created: %s", event.data);
    }
  );
};
