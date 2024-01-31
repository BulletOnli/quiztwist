"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteClassroomBtn from "./DeleteClassroomBtn";
import { leaveClassroomAction } from "@/lib/actions/classroom.actions";
import { toast } from "sonner";
import LeaveClassroomBtn from "./LeaveClassroomBtn";

type LeaveClassroomDialogProps = {
  roomId: string;
};

const LeaveClassroomDialog = ({ roomId }: LeaveClassroomDialogProps) => {
  const router = useRouter();
  const [leaveConfirmed, setLeaveConfirmed] = useState(false);

  const handleLeaveClassroom = async (formData: FormData) => {
    const response = await leaveClassroomAction(formData, roomId);

    if (response?.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    router.replace(`/dashboard`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Leave</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave this classroom?</DialogTitle>
          <DialogDescription className="font-medium">
            To confirm, type{" "}
            <span className="font-bold">&quot;Confirm&quot;</span> in the box
            below
          </DialogDescription>
        </DialogHeader>
        <form action={handleLeaveClassroom} className="flex flex-col gap-4 ">
          <Input
            id="confirmLeave"
            className="text-center"
            name="confirmLeave"
            required
            maxLength={7}
            autoComplete="off"
            onChange={(e) => {
              if (e.target.value === "Confirm") {
                setLeaveConfirmed(true);
              } else {
                setLeaveConfirmed(false);
              }
            }}
          />

          <LeaveClassroomBtn leaveConfirmed={leaveConfirmed} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveClassroomDialog;
