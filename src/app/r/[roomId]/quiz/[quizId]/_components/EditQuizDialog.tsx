"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateQuizAction } from "@/lib/actions/quiz.actions";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizSchemaType } from "@/lib/models/quiz.model";
import { useState } from "react";
import SubmitBtn from "@/components/shared/SubmitBtn";

import moment from "moment";
import { useParams } from "next/navigation";
import { ParamsTypes } from "@/types/paramsTypes";

type EditQuizDialogProps = {
  quizInfo: string;
};

const EditQuizDialog = ({ quizInfo }: EditQuizDialogProps) => {
  const { quizId } = useParams<ParamsTypes>();

  const quizInfoData = JSON.parse(quizInfo) as QuizSchemaType;
  const [open, setOpen] = useState(false);

  const deadline = moment(new Date(quizInfoData.deadline));

  const handleEditQuiz = async (formData: FormData) => {
    const response = await updateQuizAction({ formData, quizId });

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 w-8 h-8 rounded-full"
        >
          <Pencil className=" w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Quiz Info</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
        </DialogHeader>
        <form action={handleEditQuiz} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Quiz Title</p>
            <Input
              id="quizTitle"
              name="quizTitle"
              placeholder="Enter a Quiz title"
              defaultValue={quizInfoData?.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Description (optional)</p>
            <Input
              id="quizDescription"
              name="quizDescription"
              placeholder="Enter a short description"
              defaultValue={quizInfoData?.description ?? ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Deadline</p>
            <Input
              name="deadline"
              type="datetime-local"
              // min={deadline.format().slice(0, 16)}
              defaultValue={deadline.format().slice(0, 16)}
            />
          </div>
          <DialogFooter>
            <SubmitBtn defaultName="Save Changes" onLoadingName="Saving..." />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuizDialog;
