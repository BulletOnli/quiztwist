import { QuestionType } from "@/lib/models/question.model";
import QuestionBox from "./QuestionBox";
import { Button } from "../ui/button";
import { submitQuiz } from "@/lib/actions/quiz.actions";
import { redirect } from "next/navigation";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type QuestionListProps = {
    questions: QuestionType[];
    quizId: string;
    isTeacher: any;
};

const QuestionList = ({ questions, quizId, isTeacher }: QuestionListProps) => {
    const submitQuizAction = async (formData: FormData) => {
        "use server";
        const response = await submitQuiz(formData, quizId);

        if (response?.error) {
            console.log(response.error);
        }

        redirect(`/quiz/${quizId}/results`);
    };

    return (
        <form action={submitQuizAction} className="flex flex-col gap-4">
            {questions.length === 0 && (
                <div className="min-w-[45rem] max-w-full p-6 bg-white border border-l-4 border-r-4 border-borderColor rounded-xl">
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-gray">1..</p>
                        <p>Sample Question</p>
                    </div>

                    <RadioGroup className="w-full grid grid-cols-2 items-center p-2 mt-2 place-items-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-full flex items-center space-x-2">
                                <RadioGroupItem value="A" id="A" />
                                <Label htmlFor="A" className="font-normal">
                                    A. Option 1
                                </Label>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <RadioGroupItem value="B" id="B" />
                                <Label htmlFor="B" className="font-normal">
                                    B. Option 2
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-full flex items-center space-x-2">
                                <RadioGroupItem value="C" id="C" />
                                <Label htmlFor="C" className="font-normal">
                                    C. Option 3
                                </Label>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <RadioGroupItem value="D" id="D" />
                                <Label htmlFor="D" className="font-normal">
                                    D. Option 4
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
            )}

            {questions.map((question, index) => (
                <QuestionBox
                    question={question}
                    index={index + 1}
                    key={question._id.toString()}
                />
            ))}
            {!isTeacher && questions.length !== 0 && (
                <Button type="submit">Submit</Button>
            )}
        </form>
    );
};

export default QuestionList;
