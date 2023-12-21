import { getClassrooms } from "@/lib/actions/classroom.actions";
import { ClassroomType } from "@/lib/models/classroom.model";
import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const ClassroomsGrid = async () => {
    const classrooms = await getClassrooms();

    return (
        <div className="w-full flex flex-wrap items-center gap-6 mt-10">
            {classrooms?.length == 0 && (
                <div className="w-full h-[50vh] flex items-center justify-center">
                    sdfsd
                </div>
            )}
            {classrooms?.map((classroom) => (
                <Link
                    key={classroom._id.toString()}
                    href={`/room/${classroom._id.toString()}/classwork`}
                    className="flex-grow min-w-[12.5rem] max-w-[16rem] h-[9rem] flex flex-col p-3 bg-secondary rounded-xl border border-borderColor"
                >
                    <div className="w-full flex justify-between ">
                        <p className="text-sm">{classroom.subject}</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm">3</p>
                            <Users className="w-4" />
                        </div>
                    </div>
                    <p className="text-xs">{classroom.section}</p>
                </Link>
            ))}
        </div>
    );
};

export default ClassroomsGrid;
