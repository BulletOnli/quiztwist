import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const ClassroomsGrid = () => {
    return (
        <div className="w-full flex flex-wrap items-center gap-6 mt-10">
            <Link
                href="/room/3/classwork"
                className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
            >
                <div className="w-full flex justify-between ">
                    <p>BSIT 1A</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">3</p>
                        <Users className="w-4" />
                    </div>
                </div>
            </Link>
            <Link
                href="/room/3/classwork"
                className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
            >
                <div className="w-full flex justify-between ">
                    <p>BSIT 1A</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">3</p>
                        <Users className="w-4" />
                    </div>
                </div>
            </Link>
            <Link
                href="/room/3/classwork"
                className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
            >
                <div className="w-full flex justify-between ">
                    <p>BSIT 1A</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">3</p>
                        <Users className="w-4" />
                    </div>
                </div>
            </Link>
            <Link
                href="/room/3/classwork"
                className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
            >
                <div className="w-full flex justify-between ">
                    <p>BSIT 1A</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">3</p>
                        <Users className="w-4" />
                    </div>
                </div>
            </Link>
            <Link
                href="/room/3/classwork"
                className="flex-grow max-w-[12.5rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
            >
                <div className="w-full flex justify-between ">
                    <p>BSIT 1A</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">3</p>
                        <Users className="w-4" />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ClassroomsGrid;
