import { Button } from "../ui/button";
import Link from "next/link";
import SidebarLinks from "./SidebarLinks";
import { getClassrooms } from "@/lib/actions/classroom.actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = async () => {
    const classrooms = (await getClassrooms()) || [];

    return (
        <div className="w-[20rem] h-[100vh] sticky top-[60px] p-4 flex flex-col items-center border-r border-borderColor">
            <div className="w-full">
                <div className="w-full flex flex-col items-center gap-2">
                    <Link href="/dashboard" className="w-full">
                        <Button variant="outline" size="lg" className="w-full">
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/" className="w-full">
                        <Button variant="outline" size="lg" className="w-full">
                            N/A
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full h-[1px] bg-borderColor my-4"></div>

            <div className="w-full flex flex-col items-center gap-4">
                <p className="font-medium">Classrooms</p>

                <div className="w-full flex flex-col">
                    {classrooms.map((classroom) => (
                        <Link
                            href={`/room/${classroom._id}/classwork`}
                            key={classroom._id.toString()}
                        >
                            <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                                <Avatar className="w-9 h-9 ">
                                    <AvatarImage />
                                    <AvatarFallback>
                                        {classroom.subject.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="w-full font-medium text-sm overflow-x-hidden whitespace-nowrap">
                                        {classroom.subject}
                                    </p>
                                    <p className="text-xs">
                                        {classroom.section}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
