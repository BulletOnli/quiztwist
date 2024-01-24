"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { updateQuestionAction } from "@/lib/actions/question.actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import NewQuestionFormBtn from "./NewQuestionFormBtn";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuestionType } from "@/lib/models/question.model";

type EditQuestionDialogProps = {
    question: string;
    quizId: string;
};

const EditQuestionDialog = ({ question, quizId }: EditQuestionDialogProps) => {
    const [open, setOpen] = useState(false);
    const questionData = JSON.parse(question) as QuestionType;

    const newQuestionAction = async (formData: FormData) => {
        const response = await updateQuestionAction({
            formData,
            quizId,
            questionId: questionData._id?.toString(),
        });

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
                    size="icon"
                    type="button"
                    className="w-7 h-7 rounded-full"
                    variant="outline"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Question</DialogTitle>
                </DialogHeader>
                <form
                    action={newQuestionAction}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">Question</p>
                        <Input
                            autoComplete="off"
                            id="question"
                            name="question"
                            placeholder="Enter a Question"
                            required
                            defaultValue={questionData?.question}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">A.</p>
                        <Input
                            autoComplete="off"
                            id="optionA"
                            name="optionA"
                            placeholder="Option A"
                            required
                            defaultValue={questionData?.choices[0]}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">B.</p>
                        <Input
                            autoComplete="off"
                            id="optionB"
                            name="optionB"
                            placeholder="Option B"
                            required
                            defaultValue={questionData?.choices[1]}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">C.</p>
                        <Input
                            autoComplete="off"
                            id="optionC"
                            name="optionC"
                            placeholder="Option C"
                            required
                            defaultValue={questionData?.choices[2]}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">D.</p>
                        <Input
                            autoComplete="off"
                            id="optionD"
                            name="optionD"
                            placeholder="Option D"
                            required
                            defaultValue={questionData?.choices[3]}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="font-medium text-sm">Answer:</p>
                        <RadioGroup
                            name="rightAnswer"
                            className="w-[70%] mx-auto grid grid-cols-4 place-items-center"
                            required
                            defaultValue={questionData?.rightAnswer}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="A"
                                    id="answerA"
                                    className="w-5 h-5"
                                />
                                <Label htmlFor="answerA">A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="B"
                                    id="answerB"
                                    className="w-5 h-5"
                                />
                                <Label htmlFor="answerB">B</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="C"
                                    id="answerC"
                                    className="w-5 h-5"
                                />
                                <Label htmlFor="answerC">C</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="D"
                                    id="answerD"
                                    className="w-5 h-5"
                                />
                                <Label htmlFor="answerD">D</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <NewQuestionFormBtn />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditQuestionDialog;
