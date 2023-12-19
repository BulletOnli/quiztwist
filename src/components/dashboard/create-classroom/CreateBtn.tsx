"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const CreateBtn = () => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <Button type="submit" disabled={pending}>
                {pending ? "Creating..." : "Create"}
            </Button>
        </DialogFooter>
    );
};

export default CreateBtn;
