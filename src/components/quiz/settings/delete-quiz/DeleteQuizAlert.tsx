"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteQuizAction } from "@/lib/actions/quiz.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteQuizBtn from "./DeleteQuizBtn";

const DeleteQuizAlert = ({
    quizId,
    roomId,
}: {
    quizId: string;
    roomId: string;
}) => {
    const router = useRouter();

    const handleDeleteAction = async () => {
        const response = await deleteQuizAction({ quizId });

        if (response.error) {
            return toast.error(response.error);
        }

        toast.success(response.message);
        router.push(`/r/${roomId}/classwork`);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-500">
                    Delete Quiz
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    AlertD{" "}
                    <AlertDialogDescription>
                        Are you sure you want to delete this Quiz? This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={handleDeleteAction}>
                        <DeleteQuizBtn />
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteQuizAlert;