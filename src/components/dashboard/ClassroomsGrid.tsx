import { getAllClassrooms } from "@/lib/actions/classroom.actions";
import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const ClassroomsGrid = async () => {
    const classrooms = await getAllClassrooms();

    return (
        <div className="w-full flex flex-wrap items-center gap-6 mt-10">
            {classrooms.map((classroom) => (
                <Link
                    key={classroom._id.toString()}
                    href={`/room/${classroom._id
                        .toString()
                        .slice(6, 11)}/classwork`}
                    className="flex-grow min-w-[12.5rem] max-w-[14rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
                >
                    <div className="w-full flex justify-between ">
                        <p>{classroom.section}</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                    <p className="text-xs">{classroom.subject}</p>
                </Link>
            ))}
        </div>
    );
};

export default ClassroomsGrid;
