import React from "react";
import NewAnnouncementModal from "./_components/NewAnnouncementModal";
import AnnouncementCard from "./_components/AnnouncementCard";
import { getAllAnnouncements } from "@/lib/actions/announcement.actions";

const AnnouncementPage = async ({ params }: { params: { roomId: string } }) => {
  const announcements = await getAllAnnouncements({ roomId: params.roomId });

  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col p-6">
      <NewAnnouncementModal />
      <div className="flex flex-col gap-4 mt-6">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement._id.toString()}
            announcement={announcement}
          />
        ))}
      </div>
    </main>
  );
};

export default AnnouncementPage;
