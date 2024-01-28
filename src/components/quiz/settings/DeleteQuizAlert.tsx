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
import SubmitBtn from "@/components/common/SubmitBtn";

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
          <AlertDialogDescription>
            Are you sure you want to delete this Quiz? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={handleDeleteAction}>
            <SubmitBtn defaultName="Delete" onLoadingName="Deleting..." />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuizAlert;
