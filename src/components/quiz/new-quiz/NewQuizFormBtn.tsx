"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const NewQuizFormBtn = () => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={pending}>
                    Close
                </Button>
            </DialogClose>
            <Button type="submit">
                {pending ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Creating...
                    </>
                ) : (
                    "Create"
                )}
            </Button>
        </DialogFooter>
    );
};

export default NewQuizFormBtn;
