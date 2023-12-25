import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ClassroomType } from "@/lib/models/classroom.model";

const SidebarLinks = ({ classrooms }: { classrooms: ClassroomType[] }) => {
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <p>Classrooms</p>
            <div className="w-full flex flex-col">
                {classrooms.map((classroom: any) => (
                    <Link href="/" key={classroom._id}>
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    {classroom.subject}
                                </p>
                                <p className="text-xs">{classroom.section}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SidebarLinks;
