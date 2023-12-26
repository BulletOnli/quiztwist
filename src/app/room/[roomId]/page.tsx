import { redirect } from "next/navigation";

type RoomPageProps = {
    params: { roomId: string };
};

const RoomPage = ({ params }: RoomPageProps) => {
    redirect(`/room/${params.roomId}/classwork`);
};

export default RoomPage;
