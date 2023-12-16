"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RoomHeader = ({ roomId }: { roomId: string }) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "classwork";

    return (
        <div className="w-full h-[10rem] flex flex-col justify-end p-6 pb-0 bg-secondary border-b border-[#CED4DA]">
            <h1 className="text-2xl font-bold ">BSIT 1A</h1>
            <p>Introduction to Computing</p>

            <ul className="flex items-center justify-end gap-10 mr-[10rem] font-medium bg-none">
                <Link href={`/room/${roomId}?tab=classwork`}>
                    <li
                        className={`${
                            tab === "classwork"
                                ? "border-black"
                                : "border-transparent"
                        } border-b-2`}
                    >
                        Classwork
                    </li>
                </Link>
                <Link href={`/room/${roomId}?tab=people`}>
                    <li
                        className={`${
                            tab === "people"
                                ? "border-black"
                                : "border-transparent"
                        } border-b-2`}
                    >
                        People
                    </li>
                </Link>
                <Link href={`/room/${roomId}?tab=settings`}>
                    <li
                        className={`${
                            tab === "settings"
                                ? "border-black"
                                : "border-transparent"
                        } border-b-2`}
                    >
                        Settings
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default RoomHeader;
