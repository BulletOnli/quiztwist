import RoomHeaderLinks from "./RoomHeaderLinks";
import { getClassroomData } from "@/lib/actions/classroom.actions";

const RoomHeader = async ({ roomId }: { roomId: string }) => {
    const classroom = await getClassroomData(roomId);

    return (
        <div className="w-full h-[10rem] flex flex-col justify-end p-8 pb-0 bg-secondary border-b border-borderColor">
            <h1 className="text-2xl font-bold">{classroom?.description}</h1>
            <p className="text-lg">{classroom?.section}</p>

            <RoomHeaderLinks roomId={roomId} />
        </div>
    );
};

export default RoomHeader;
