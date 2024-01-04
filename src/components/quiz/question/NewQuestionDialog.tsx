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
import { Plus } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { createQuestion } from "@/lib/actions/question.actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import NewQuestionFormBtn from "./NewQuestionFormBtn";

const NewQuestionDialog = () => {
    const [open, setOpen] = useState(false);
    const quizId = usePathname().split("/")[2];

    const newQuestionAction = async (formData: FormData) => {
        const response = await createQuestion(formData, quizId);

        if (response.error) {
            return toast.error(response.error);
        }

        toast.success(response.message);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <Plus className="mr-1 w-5 h-5" /> Add Question
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Question</DialogTitle>
                </DialogHeader>
                <form
                    action={newQuestionAction}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">Question</p>
                        <Input
                            id="question"
                            name="question"
                            placeholder="Enter a Question"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">A.</p>
                        <Input
                            id="optionA"
                            name="optionA"
                            placeholder="Option A"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">B.</p>
                        <Input
                            id="optionB"
                            name="optionB"
                            placeholder="Option B"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">C.</p>
                        <Input
                            id="optionC"
                            name="optionC"
                            placeholder="Option C"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">D.</p>
                        <Input
                            id="optionD"
                            name="optionD"
                            placeholder="Option D"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="font-medium text-sm">Answer:</p>
                        <Input
                            id="rightAnswer"
                            name="rightAnswer"
                            placeholder="Right Answer"
                            required
                            maxLength={1}
                        />
                    </div>
                    <NewQuestionFormBtn />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewQuestionDialog;
