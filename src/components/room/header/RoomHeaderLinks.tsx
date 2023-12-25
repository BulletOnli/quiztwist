"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoomHeaderLinks = ({ roomId }: { roomId: string }) => {
    const pathname = usePathname();

    const currentPathname = pathname.split("/").pop();

    return (
        <ul className="flex items-center justify-end gap-10 mr-[10rem] font-medium bg-none">
            <Link href={`/room/${roomId}/classwork`}>
                <li
                    className={`${
                        currentPathname === "classwork"
                            ? "border-black"
                            : "border-transparent"
                    } border-b-2`}
                >
                    Classwork
                </li>
            </Link>
            <Link href={`/room/${roomId}/people`}>
                <li
                    className={`${
                        currentPathname === "people"
                            ? "border-black"
                            : "border-transparent"
                    } border-b-2`}
                >
                    People
                </li>
            </Link>
            <Link href={`/room/${roomId}/settings`}>
                <li
                    className={`${
                        currentPathname === "settings"
                            ? "border-black"
                            : "border-transparent"
                    } border-b-2`}
                >
                    Settings
                </li>
            </Link>
        </ul>
    );
};

export default RoomHeaderLinks;
