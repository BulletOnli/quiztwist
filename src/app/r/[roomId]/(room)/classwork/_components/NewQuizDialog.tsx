"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createQuiz } from "@/lib/actions/quiz.actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/shared/SubmitBtn";

const NewQuizDialog = () => {
  const { roomId } = useParams() as {
    roomId: string;
  };
  const router = useRouter();

  const newQuizAction = async (formData: FormData) => {
    const response = await createQuiz({ formData, roomId });

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
    router.push(`quiz/${response.quizId}/questions`);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col gap-2">
          <div className="w-[8rem] h-[6rem] flex justify-center items-center border border-borderColor rounded-lg bg-secondary-gray">
            <Image width="30" height="30" src="/plus.png" alt="" />
          </div>
          <p className="text-sm text-start">Blank Quiz</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Quiz</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
        </DialogHeader>
        <form action={newQuizAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Quiz Title</p>
            <Input
              id="quizTitle"
              name="quizTitle"
              placeholder="Enter a Quiz title"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Description (optional)</p>
            <Input
              id="quizDescription"
              name="quizDescription"
              placeholder="Enter a short description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Deadline</p>
            <Input
              name="deadline"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <SubmitBtn defaultName="Create" onLoadingName="Creating..." />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuizDialog;
