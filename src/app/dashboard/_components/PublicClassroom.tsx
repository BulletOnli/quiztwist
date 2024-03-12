import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

const PublicClassroom = () => {
  return (
    <Link href={`/r/65dea0ee9cacf08fc5ecffe8/classwork`}>
      <div className="flex-grow min-w-[15rem] max-w-[16rem] h-[9rem] flex flex-col justify-between p-3 bg-secondary hover:shadow rounded-lg border border-borderColor">
        <div>
          <div className="w-full flex justify-between ">
            <p className="font-semibold overflow-x-hidden mr-6">Public</p>
            <div className="flex items-center gap-1">
              <p className="text-sm">99+</p>
              <Users className="w-4" />
            </div>
          </div>
          <p className="text-xs">BSIT</p>
        </div>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt="User avatar"
            />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs">Bullet</p>
            <p className="text-[10px]">Teacher</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PublicClassroom;
