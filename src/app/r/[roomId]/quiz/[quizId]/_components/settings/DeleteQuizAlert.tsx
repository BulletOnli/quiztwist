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
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { ParamsTypes } from "@/types/paramsTypes";

const DeleteQuizAlert = () => {
  const { quizId, roomId } = useParams<ParamsTypes>();
  const router = useRouter();

  const handleDeleteAction = async () => {
    const response = await deleteQuizAction({ quizId });

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    router.replace(`/r/${roomId}/classwork`);
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
