"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const JoinBtn = ({ inputLength }: { inputLength: number }) => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <Button type="submit" disabled={inputLength < 5 || pending}>
                {pending ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Joining...
                    </>
                ) : (
                    "Join"
                )}
            </Button>
        </DialogFooter>
    );
};

export default JoinBtn;
