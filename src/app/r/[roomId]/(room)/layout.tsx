import RoomHeader from "@/app/r/[roomId]/(room)/_components/header/RoomHeader";
import Sidebar from "@/components/shared/Sidebar";
import { getClassroomData } from "@/lib/actions/classroom.actions";
import { Metadata } from "next";

type RoomLayoutProps = {
  children: React.ReactNode;
  params: { roomId: string };
};

export async function generateMetadata({
  params,
}: RoomLayoutProps): Promise<Metadata> {
  const response = await getClassroomData(params.roomId);

  return {
    title: response?.subject,
  };
}

export default async function RoomLayout({
  children,
  params,
}: RoomLayoutProps) {
  return (
    <div className="w-full min-h-screen relative flex">
      <Sidebar />
      <div className="w-full flex flex-col items-center mx-auto">
        <div className="relative w-full flex flex-col">
          <RoomHeader roomId={params.roomId} />
          {children}
        </div>
      </div>
    </div>
  );
}
