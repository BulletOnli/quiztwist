"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const LeaveClassroomBtn = ({ leaveConfirmed }: { leaveConfirmed: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={!leaveConfirmed || pending} className="text-red-300">
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          Leaving...
        </>
      ) : (
        "Leave this classroom"
      )}
    </Button>
  );
};

export default LeaveClassroomBtn;
