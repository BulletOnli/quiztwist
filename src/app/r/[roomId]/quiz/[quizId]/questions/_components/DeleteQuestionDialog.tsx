"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteQuestionAction } from "@/lib/actions/question.actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { ParamsTypes } from "@/types/paramsTypes";

type DeleteQuestionDialogProps = {
  questionId: string;
};

const DeleteQuestionDialog = ({ questionId }: DeleteQuestionDialogProps) => {
  const { quizId } = useParams<ParamsTypes>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteQuestionAction({
      quizId,
      questionId,
    });

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    setDialogOpen(false);
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          type="button"
          className="w-7 h-7 rounded-full"
          variant="outline"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Question.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={handleDelete}>
            <SubmitBtn defaultName="Delete" onLoadingName="Deleting..." />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuestionDialog;
