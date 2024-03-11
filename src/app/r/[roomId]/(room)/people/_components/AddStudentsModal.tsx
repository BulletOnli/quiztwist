"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { addStudentToClassroomAction } from "@/lib/actions/classroom.actions";

const AddStudentsModal = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);

  const handleAction = async (formData: FormData) => {
    const response = await addStudentToClassroomAction({ formData, roomId });

    if (response?.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UserPlus className="w-5 h-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a student</DialogTitle>
          <DialogDescription>
            Enter the email of the student you want to add.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="flex flex-col gap-4">
          <Input
            id="studentEmail"
            name="studentEmail"
            type="email"
            required
            placeholder="ex. juandelacruz@email.com"
          />

          <SubmitBtn defaultName="Add to classroom" onLoadingName="Adding..." />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentsModal;
