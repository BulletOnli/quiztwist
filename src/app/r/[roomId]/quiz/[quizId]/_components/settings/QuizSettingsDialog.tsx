"use client";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import DeleteQuizAlert from "./DeleteQuizAlert";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toggleQuizStatusAction } from "@/lib/actions/quiz.actions";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { ParamsTypes } from "@/types/paramsTypes";

type QuizSettingsDialogProps = {
  isOpen: boolean;
};

const QuizSettingsDialog = ({ isOpen }: QuizSettingsDialogProps) => {
  const { quizId } = useParams<ParamsTypes>();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleQuiz = async () => {
    setIsLoading(true);
    const response = await toggleQuizStatusAction({ quizId });
    setIsLoading(false);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quiz Settings</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 mt-2">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Accepting Response?</p>
              <p className="text-xs">
                Enable when you&apos;re ready to accept responses from Students.
              </p>
            </div>
            <Switch
              disabled={isLoading}
              checked={isOpen}
              onCheckedChange={handleToggleQuiz}
            />
          </div>
        </form>

        <DeleteQuizAlert />
      </DialogContent>
    </Dialog>
  );
};

export default QuizSettingsDialog;
