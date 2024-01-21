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
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteClassroomBtn from "./DeleteClassroomBtn";
import { deleteClassroomAction } from "@/lib/actions/classroom.actions";
import { toast } from "sonner";

type DeleteClassroomDialogProps = {
    roomId: string;
};

const DeleteClassroomDialog = ({ roomId }: DeleteClassroomDialogProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);

    const joinFormAction = async (formData: FormData) => {
        const response = await deleteClassroomAction(formData, roomId);

        if (response?.error) {
            return toast.error(response.error);
        }

        toast.success(response.message);
        setOpen(false);
        router.push(`/dashboard`);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete this classroom?</DialogTitle>
                    <DialogDescription className="font-medium">
                        To confirm, type{" "}
                        <span className="font-bold">"Confirm"</span> in the box
                        below
                    </DialogDescription>
                </DialogHeader>
                <form action={joinFormAction} className="flex flex-col gap-4 ">
                    <Input
                        id="confirmDelete"
                        className="text-center"
                        name="confirmDelete"
                        required
                        maxLength={7}
                        autoComplete="off"
                        onChange={(e) => {
                            if (e.target.value === "Confirm") {
                                setDeleteConfirmed(true);
                            } else {
                                setDeleteConfirmed(false);
                            }
                        }}
                    />

                    <DeleteClassroomBtn deleteConfirmed={deleteConfirmed} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteClassroomDialog;
