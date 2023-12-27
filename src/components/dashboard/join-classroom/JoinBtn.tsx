"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";

const JoinBtn = () => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button type="submit" disabled={pending}>
                    {pending ? "Joining..." : "Join"}
                </Button>
            </DialogClose>
        </DialogFooter>
    );
};

export default JoinBtn;
