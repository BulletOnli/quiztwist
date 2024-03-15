import DeleteClassroomDialog from "@/app/r/[roomId]/(room)/settings/_components/DeleteClassroomDialog";
import LeaveClassroomDialog from "@/app/r/[roomId]/(room)/settings/_components/LeaveClassroomDialog";
import UpdateClassroomForm from "@/app/r/[roomId]/(room)/settings/_components/UpdateClassroomForm";
import { getClassroomData } from "@/lib/actions/classroom.actions";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";

type SettingsPageProps = {
  params: { roomId: string };
};

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const session = await getServerSession(authOptions);
  const isStudent = session?.user.role === "Student";
  const classroomData = await getClassroomData(params.roomId);

  return (
    <main className="w-full flex flex-col items-center justify-between p-10">
      {!isStudent && (
        <div className="w-[30rem] flex flex-col items-center justify-center p-4 border border-borderColor rounded-lg">
          <p className="font-medium text-lg">Edit Classroom Details</p>
          <div className="w-full flex flex-col p-4">
            <UpdateClassroomForm
              roomId={params.roomId}
              classroomData={JSON.stringify(classroomData ?? {})}
            />
          </div>
        </div>
      )}
      <div className="w-[80%] px-4 py-2 mt-20 flex items-center justify-between border border-borderColor rounded-lg">
        <p>Want to {isStudent ? "leave" : "delete"} the classroom?</p>
        {isStudent ? (
          <LeaveClassroomDialog roomId={params.roomId} />
        ) : (
          <DeleteClassroomDialog roomId={params.roomId} />
        )}
      </div>
    </main>
  );
};

export default SettingsPage;
