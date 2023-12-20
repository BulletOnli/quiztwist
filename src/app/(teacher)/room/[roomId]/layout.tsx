import RoomHeader from "@/components/room/header/RoomHeader";

type RoomLayoutProps = {
    children: React.ReactNode;
    params: { roomId: string };
};

export default async function RoomLayout({
    children,
    params,
}: RoomLayoutProps) {
    return (
        <div className="relative w-full min-h-screen flex flex-col">
            <RoomHeader roomId={params.roomId} />
            {children}
        </div>
    );
}
