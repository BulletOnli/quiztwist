import AddStudentsModal from "@/app/r/[roomId]/(room)/people/_components/AddStudentsModal";
import StudentsList from "@/app/r/[roomId]/(room)/people/_components/StudentsList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getClassroomData } from "@/lib/actions/classroom.actions";
import Link from "next/link";
import { Download } from "lucide-react";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";

type PeoplePageProps = {
  params: { roomId: string };
};

const PeoplePage = async ({ params }: PeoplePageProps) => {
  const session = await getServerSession(authOptions);
  const isStudent = session?.user.role === "Student";

  const classroom = await getClassroomData(params.roomId);

  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col p-10 ">
      {!isStudent && (
        <div className="w-full flex items-center justify-between gap-1 mb-6">
          <AddStudentsModal roomId={params.roomId} />
          <Button asChild variant="outline" className="w-full">
            <Link
              href={`/api/export/students/${classroom?._id}`}
              target="_parent"
            >
              <Download className="w-5 h-5 mr-2" /> Export Students
            </Link>
          </Button>
        </div>
      )}
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Teacher</h1>

          <div className="flex items-center gap-2">
            <p className=" text-gray">1</p>
          </div>
        </div>
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
            <p className=" text-gray">{classroom?.students.length}</p>
          </div>
        </div>
        <StudentsList students={classroom?.students || []} />
      </div>
    </main>
  );
};

export default PeoplePage;
