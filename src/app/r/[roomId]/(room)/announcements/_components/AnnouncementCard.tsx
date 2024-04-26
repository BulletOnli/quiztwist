"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AnnouncementCard = () => {
  return (
    <div className="px-6 py-4 rounded-xl border border-borderColor">
      <div className="w-full flex items-center justify-between ">
        <div className="w-full flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sm">Gemmuel Dela Pena</p>
            <p className="text-xs text-secondary-grayText">April 30</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-ellipsis-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm mt-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
        perferendis deserunt error cupiditate, inventore magnam eius maiores
        amet sit eos. Reprehenderit alias qui accusantium est corporis dolorum
        maiores officia ratione!
      </p>
    </div>
  );
};

export default AnnouncementCard;
