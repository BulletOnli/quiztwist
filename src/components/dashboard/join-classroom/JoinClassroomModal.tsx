"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import JoinBtn from "./JoinBtn";
import { useState } from "react";
import { joinClassroom } from "@/lib/actions/classroom.actions";
import { toast } from "sonner";

const JoinClassroomModal = () => {
    const [inputLength, setInputLength] = useState(0);
    const [open, setOpen] = useState(false);

    const joinFormAction = async (formData: FormData) => {
        const response = await joinClassroom(formData);

        if (response?.error) {
            return toast.error(response.error);
        }

        toast.success(response.message);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Join Classroom</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Join a Classroom</DialogTitle>
                    <DialogDescription>
                        Please enter the 5-letter classroom code.
                    </DialogDescription>
                </DialogHeader>
                <form action={joinFormAction} className="flex flex-col gap-4">
                    <Input
                        id="classCode"
                        className="text-lg text-center"
                        name="classCode"
                        required
                        maxLength={5}
                        minLength={5}
                        placeholder="aBcDe"
                        onChange={(e) => setInputLength(e.target.value.length)}
                    />

                    <JoinBtn inputLength={inputLength} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default JoinClassroomModal;
