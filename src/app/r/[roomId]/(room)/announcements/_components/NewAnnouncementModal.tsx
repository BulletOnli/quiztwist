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
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { ParamsTypes } from "@/types/paramsTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { newAnnouncementAction } from "@/lib/actions/announcement.actions";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UploadFileResponse } from "@/types/uploadthingTypes";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";
import UploadedFilePreview from "./UploadedFilePreview";

const NewAnnouncementModal = () => {
  const { data: session } = useSession();
  const { roomId } = useParams<ParamsTypes>();
  const [openModal, setOpenModal] = useState(false);
  const [fileResponse, setFileResponse] = useState<UploadFileResponse[]>([]);

  const handleNewAnnouncement = async (formData: FormData) => {
    const response = await newAnnouncementAction({
      formData,
      roomId,
      files: fileResponse,
    });

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    setOpenModal(false);
  };

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger className="w-full">
        <div className="w-full border border-borderColor flex items-center gap-4 py-4 px-6 rounded-lg shadow hover:shadow-md cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src={session?.user.image} />
            <AvatarFallback>{session?.user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray">Announce something to class</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Announce to everyone</DialogTitle>
          <DialogDescription>
            Everyone in this classroom will receive email notifications.
          </DialogDescription>
        </DialogHeader>
        <form action={handleNewAnnouncement} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Textarea
              rows={10}
              className="outline-none max-h-52"
              name="content"
              required
            />
            <main className="flex flex-col items-center justify-between mt-2">
              <div className="w-full flex flex-col gap-2">
                {fileResponse?.map((response) => (
                  <UploadedFilePreview
                    key={response.key}
                    response={response}
                    setFileResponse={setFileResponse}
                  />
                ))}
              </div>

              <UploadButton
                config={{
                  mode: "auto",
                }}
                endpoint="fileUploader"
                onClientUploadComplete={(
                  res: ClientUploadedFileData<null>[]
                ) => {
                  setFileResponse((prev) => [res[0], ...prev]);
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message);
                }}
                className="w-full p-4"
              />
            </main>
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
