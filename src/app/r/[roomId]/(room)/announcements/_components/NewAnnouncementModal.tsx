"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createQuiz } from "@/lib/actions/quiz.actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { ParamsTypes } from "@/types/paramsTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const NewAnnouncementModal = () => {
  const { roomId } = useParams<ParamsTypes>();
  const router = useRouter();

  const handleNewAnnouncement = async (formData: FormData) => {};

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full border border-borderColor flex items-center gap-4 py-4 px-6 rounded-lg shadow hover:shadow-md cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray">Announce something to your class</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Announce to everyone</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
        </DialogHeader>
        <form action={handleNewAnnouncement} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Textarea className="outline-none  max-h-52" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitBtn defaultName="Post" onLoadingName="Posting..." />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAnnouncementModal;
