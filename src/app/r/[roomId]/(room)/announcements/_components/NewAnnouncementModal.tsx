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
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { UploadFileResponse } from "@/types/uploadthingTypes";
import { useUploadThing } from "@/utils/uploadthing";
import UploadedFilePreview from "./UploadedFilePreview";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Loader2 } from "lucide-react";

const MAX_FILES_UPLOAD = 3;

const NewAnnouncementModal = () => {
  const { data: session } = useSession();
  const { roomId } = useParams<ParamsTypes>();
  const [openModal, setOpenModal] = useState(false);
  const [fileResponse, setFileResponse] = useState<UploadFileResponse[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "fileUploader",
    {
      onClientUploadComplete: (res) => {
        setFileResponse((prev) => [...res, ...prev]);
      },
      onUploadError: (err) => {
        // If error, check the "core.ts" first.
        toast.error(err.message);
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    disabled: isUploading,
    maxFiles: MAX_FILES_UPLOAD,
    maxSize: 1000000,
    multiple: true,
  });

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
    setFileResponse([]);
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
              {fileResponse.length < MAX_FILES_UPLOAD && (
                <div
                  {...getRootProps()}
                  className="w-full p-4 flex justify-center items-center mt-2 rounded-lg border border-dashed border-borderColor"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      type="button"
                      className=" px-4"
                      disabled={isUploading}
                    >
                      {isUploading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isUploading ? "Uploading" : "Browse"}
                    </Button>
                    <p className="text-secondary-grayText text-sm">
                      or drag files here
                    </p>
                  </div>
                </div>
              )}
              {isDragReject && (
                <p className="w-full text-center text-sm text-red-600 font-medium p-2 bg-red-200 mt-2">
                  A maximum of {MAX_FILES_UPLOAD} files with a total size of
                  20MB are allowed.
                </p>
              )}
            </main>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitBtn
              defaultName="Post"
              onLoadingName="Posting..."
              disabled={isUploading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAnnouncementModal;
