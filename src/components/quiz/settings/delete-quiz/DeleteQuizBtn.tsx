import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const DeleteQuizBtn = () => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Deleting...
                </>
            ) : (
                "Delete"
            )}
        </Button>
    );
};

export default DeleteQuizBtn;
