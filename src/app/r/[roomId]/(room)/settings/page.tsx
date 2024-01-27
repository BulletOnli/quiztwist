import DeleteClassroomDialog from "@/components/room/settings/DeleteClassroomDialog";
import UpdateClassroomForm from "@/components/room/settings/UpdateClassroomForm";
import { getClassroomData } from "@/lib/actions/classroom.actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | QuizTwist",
    description: "Generated by create next app",
};

type SettingsPageProps = {
    params: { roomId: string };
};

const SettingsPage = async ({ params }: SettingsPageProps) => {
    const classroomData = await getClassroomData(params.roomId);

    return (
        <main className="w-full flex flex-col items-center justify-between p-10">
            <div className="w-[30rem] flex flex-col items-center justify-center p-4 border border-borderColor rounded-lg">
                <p className="font-medium text-lg">Edit Classroom Details</p>
                <div className="w-full flex flex-col p-4">
                    <UpdateClassroomForm
                        roomId={params.roomId}
                        classroomData={JSON.stringify(classroomData ?? {})}
                    />
                </div>
            </div>

            <div className="w-[80%] px-4 py-2 mt-20 flex items-center justify-between border border-borderColor rounded-lg">
                <p>Want to delete the classroom?</p>
                <DeleteClassroomDialog roomId={params.roomId} />
            </div>
        </main>
    );
};

export default SettingsPage;