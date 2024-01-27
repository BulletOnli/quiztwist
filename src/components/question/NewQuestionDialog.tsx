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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const NewQuestionDialog = ({ roomId }: { roomId: string }) => {
    const [open, setOpen] = useState(false);
    const quizId = usePathname().split("/")[2];

    const newQuestionAction = async (formData: FormData) => {
        const response = await createQuestion({ formData, quizId, roomId });

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
                            autoComplete="off"
                            id="question"
                            name="question"
                            placeholder="Enter a Question"
                            required
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
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="font-medium text-sm">Answer:</p>
                        <RadioGroup
                            name="rightAnswer"
                            className="w-[70%] mx-auto grid grid-cols-4 place-items-center"
                            required
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

export default NewQuestionDialog;
