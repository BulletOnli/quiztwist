"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const UpdateClassroomBtn = () => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full mt-2">
            {pending ? "Saving..." : "Save Changes"}
        </Button>
    );
};

export default UpdateClassroomBtn;
