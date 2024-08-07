"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnnouncementType } from "@/lib/models/announcement.model";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteAnnouncementAction } from "@/lib/actions/announcement.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import UploadedFilePreview from "./UploadedFilePreview";
import Image from "next/image";
import Link from "next/link";

const AnnouncementCard = ({
  announcement,
}: {
  announcement: AnnouncementType;
}) => {
  const { data: session } = useSession();
  const { _id, author, content, updatedAt, files } = announcement;

  const handleDeleteAnnouncement = async () => {
    const response = await deleteAnnouncementAction({
      announcementId: _id.toString(),
    });

    if (response.error) {
      return toast.error(response.error);
    }

    return toast.success(response.message);
  };

  return (
    <div className="px-6 py-4 rounded-xl border border-borderColor">
      <div className="w-full flex items-center justify-between ">
        <div className="w-full flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author?.profilePic || ""} />
            <AvatarFallback>{author?.firstName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sm">
              {author?.firstName} {author?.lastName}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="text-left text-xs text-secondary-grayText">
                    {moment(updatedAt).startOf("minutes").fromNow()}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{moment(updatedAt).format("LLL")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {session?.user.id === author?._id.toString() && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ellipsis-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled>Edit</DropdownMenuItem>

              <DropdownMenuItem onClick={handleDeleteAnnouncement}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div
        className="text-sm mt-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {files?.map((file) => (
          <Link
            key={file?.key}
            href={file?.url}
            target="_blank"
            className="min-w-fit flex-grow"
          >
            <div
              key={file?.key}
              className="relative w-full flex items-center gap-4 border border-borderColor rounded-lg p-2"
            >
              <Image
                src={file?.type?.includes("image") ? file?.url : "/pdf.png"}
                alt="announcement-icon"
                width="40"
                height="40"
                className="w-auto"
              />
              <div>
                <p className="text-sm">{file?.name}</p>
                <p className="text-[10px] text-secondary-grayText">
                  {file?.type.toUpperCase()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementCard;
