import RoomHeader from "@/components/room/RoomHeader";
import TabsContentSection from "@/components/room/TabsContentSection";

type RoomPageProps = {
    params: { roomId: string };
};

const RoomPage = ({ params }: RoomPageProps) => {
    return (
        <div className="relative w-full min-h-screen flex flex-col">
            <RoomHeader roomId={params.roomId} />
            <TabsContentSection />
        </div>
    );
};

export default RoomPage;
