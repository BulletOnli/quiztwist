"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

const NewQuestionFormBtn = () => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={pending}>
                    Close
                </Button>
            </DialogClose>
            <Button type="submit">{pending ? "Creating..." : "Create"}</Button>
        </DialogFooter>
    );
};

export default NewQuestionFormBtn;
