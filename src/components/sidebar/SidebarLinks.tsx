import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ClassroomType } from "@/lib/models/classroom.model";

const SidebarLinks = ({ classrooms }: { classrooms: ClassroomType[] }) => {
  return (
    <div className="w-full flex flex-col">
      {classrooms.map((classroom) => (
        <Link
          href={`/r/${classroom._id}/classwork`}
          key={classroom._id.toString()}
        >
          <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
            <Avatar className="w-9 h-9 ">
              <AvatarImage alt="Classroom avatar" />
              <AvatarFallback>{classroom.subject.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="w-full font-medium text-sm overflow-x-hidden whitespace-nowrap">
                {classroom.subject}
              </p>
              <p className="text-xs">{classroom.section}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarLinks;
