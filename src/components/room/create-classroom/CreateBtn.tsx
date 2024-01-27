"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const CreateBtn = () => {
    const { pending } = useFormStatus();

    return (
        <DialogFooter>
            <Button type="submit" disabled={pending}>
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

export default CreateBtn;
