import AddStudentsModal from "@/components/room/people/AddStudentsModal";
import StudentsList from "@/components/room/people/StudentsList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getClassroomData } from "@/lib/actions/classroom.actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People | QuizTwist",
};

type PeoplePageProps = {
  params: { roomId: string };
};

const PeoplePage = async ({ params }: PeoplePageProps) => {
  const classroom = await getClassroomData(params.roomId);

  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col p-10 ">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-xl font-medium">Teacher</h1>
        <div className="w-full flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-14 h-14">
              <AvatarImage
                src={
                  classroom?.teacher.profilePic ||
                  "https://github.com/shadcn.png"
                }
                alt="User avatar"
              />
              <AvatarFallback>
                {classroom?.teacher.firstName?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-center">
              {classroom?.teacher.firstName}
              <br />
              {classroom?.teacher.lastName}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="w-full flex flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Students</h1>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray">{classroom?.students.length}</p>
            <AddStudentsModal roomId={params.roomId} />
          </div>
        </div>
        <StudentsList students={classroom?.students || []} />
      </div>
    </main>
  );
};

export default PeoplePage;
