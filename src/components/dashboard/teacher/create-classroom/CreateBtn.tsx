"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";

const CreateBtn = () => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <DialogClose>
                <Button type="submit" disabled={pending}>
                    {pending ? "Creating..." : "Create"}
                </Button>
            </DialogClose>
        </DialogFooter>
    );
};

export default CreateBtn;
