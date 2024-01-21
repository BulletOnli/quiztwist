import { getClassrooms } from "@/lib/actions/classroom.actions";
import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ClassroomsGrid = async () => {
    const classrooms = await getClassrooms();

    return (
        <div className="w-full flex flex-wrap items-center gap-6 mt-10">
            {classrooms?.length == 0 && (
                <div className="w-full h-[50vh] flex items-center justify-center">
                    No Classroom yet
                </div>
            )}
            {classrooms?.map((classroom) => (
                <Link
                    key={classroom._id.toString()}
                    href={`/room/${classroom._id.toString()}/classwork`}
                >
                    <div className="flex-grow min-w-[15rem] max-w-[16rem] h-[9rem] flex flex-col justify-between p-3 bg-secondary hover:shadow rounded-lg border border-borderColor">
                        <div>
                            <div className="w-full flex justify-between ">
                                <p className="font-semibold overflow-x-hidden mr-6">
                                    {classroom.subject}
                                </p>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm">
                                        {classroom.students.length + 1}
                                    </p>
                                    <Users className="w-4" />
                                </div>
                            </div>
                            <p className="text-xs">{classroom.section}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={
                                        classroom?.teacher.profilePic ||
                                        "https://github.com/shadcn.png"
                                    }
                                />
                                <AvatarFallback>
                                    {classroom?.teacher.firstName?.slice(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xs">
                                    {classroom?.teacher.firstName}{" "}
                                    {classroom?.teacher.lastName}
                                </p>
                                <p className="text-[10px]">Teacher</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ClassroomsGrid;
