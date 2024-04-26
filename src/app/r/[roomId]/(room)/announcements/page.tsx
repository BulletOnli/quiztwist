import React from "react";
import NewAnnouncementModal from "./_components/NewAnnouncementModal";
import AnnouncementCard from "./_components/AnnouncementCard";

const AnnouncementPage = () => {
  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col p-6">
      <NewAnnouncementModal />
      <div className="flex flex-col gap-4 mt-6">
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </main>
  );
};

export default AnnouncementPage;
