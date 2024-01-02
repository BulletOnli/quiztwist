"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";

const JoinBtn = ({ inputLength }: { inputLength: number }) => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button type="submit" disabled={inputLength < 5}>
                    {pending ? "Joining..." : "Join"}
                </Button>
            </DialogClose>
        </DialogFooter>
    );
};

export default JoinBtn;