import ClassroomsGrid from "@/app/dashboard/_components/ClassroomsGrid";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import authOptions from "@/utils/authOptions";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateClassroomModal from "@/app/dashboard/_components/CreateClassroomModal";
import JoinClassroomModal from "@/app/dashboard/_components/join-classroom/JoinClassroomModal";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-full max-w-7xl flex flex-col">
      <div className="w-full flex justify-between items-center mt-10">
        <div>
          <h1 className="font-bold text-2xl">My Classrooms</h1>
          <p className="text-sm text-secondaryGray">
            You can manage your classrooms below
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"outline"} size="icon">
            <Search className="w-5" />
          </Button>
          {session?.user.role === "Teacher" ? (
            <CreateClassroomModal />
          ) : (
            <JoinClassroomModal />
          )}
        </div>
      </div>
      <ClassroomsGrid />
    </main>
  );
};

export default DashboardPage;
