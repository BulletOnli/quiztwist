"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClassroomAction } from "@/lib/actions/classroom.actions";
import SubmitBtn from "@/components/shared/SubmitBtn";

const CreateClassroomModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const createClassroomModalAction = async (formData: FormData) => {
    const response = await createClassroomAction(formData);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    router.push(`/r/${response.roomId}/classwork`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Classroom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Classroom</DialogTitle>
          <DialogDescription>
            Enter the subject and section name
          </DialogDescription>
        </DialogHeader>
        <form action={createClassroomModalAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                className="col-span-3"
                name="subject"
                placeholder="CC 101"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                name="description"
                placeholder="Computer Programming 1"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <Input
                id="section"
                className="col-span-3"
                placeholder="BSIT 1A"
                required
                name="section"
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitBtn defaultName="Create" onLoadingName="Creating..." />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassroomModal;
