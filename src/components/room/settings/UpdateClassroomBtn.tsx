"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const UpdateClassroomBtn = () => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full mt-2">
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Saving...
                </>
            ) : (
                "Save Changes"
            )}
        </Button>
    );
};

export default UpdateClassroomBtn;
