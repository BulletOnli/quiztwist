"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const DeleteClassroomBtn = ({
    deleteConfirmed,
}: {
    deleteConfirmed: boolean;
}) => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={!deleteConfirmed} className="text-red-300">
            {pending ? "Deleting..." : "Delete this classroom"}
        </Button>
    );
};

export default DeleteClassroomBtn;
