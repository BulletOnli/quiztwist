import RoomHeaderLinks from "./RoomHeaderLinks";
import { getClassroomData } from "@/lib/actions/classroom.actions";

const RoomHeader = async ({ roomId }: { roomId: string }) => {
    const classroom = await getClassroomData(roomId);

    return (
        <div className="w-full h-[10rem] flex flex-col justify-end p-6 pb-0 bg-secondary border-b border-[#CED4DA]">
            <h1 className="text-2xl font-bold ">
                {classroom?.subject.toUpperCase()}
            </h1>
            <p>{classroom?.section}</p>

            <RoomHeaderLinks roomId={roomId} />
        </div>
    );
};

export default RoomHeader;
