"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteClassroomBtn = ({
    deleteConfirmed,
}: {
    deleteConfirmed: boolean;
}) => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={!deleteConfirmed || pending} className="text-red-300">
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Deleting...
                </>
            ) : (
                "Delete this classroom"
            )}
        </Button>
    );
};

export default DeleteClassroomBtn;
