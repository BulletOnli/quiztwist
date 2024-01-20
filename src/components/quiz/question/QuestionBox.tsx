import { QuestionType } from "@/lib/models/question.model";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteQuestionDialog from "./DeleteQuestionDialog";

type QuestionBoxProps = {
    question: QuestionType;
    index: number;
    quizId: string;
};

const QuestionBox = ({ question, index, quizId }: QuestionBoxProps) => {
    return (
        <div className="relative min-w-[45rem] max-w-full p-6 bg-white border border-l-4 border-r-4 border-borderColor rounded-xl">
            <DeleteQuestionDialog
                questionId={question._id.toString()}
                quizId={quizId}
            />

            <div className="flex items-center gap-2">
                <p className="text-xs text-gray">{index}.</p>
                <p>{question.question}</p>D B D
            </div>

            <RadioGroup
                name={`question#${question._id}_answer`}
                className="w-full grid grid-cols-2 items-center p-2 mt-2 place-items-center"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value="A"
                            id={question.question + question.choices[0]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[0]}
                            className="font-normal"
                        >
                            A. {question.choices[0]}
                        </Label>
                    </div>
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value="B"
                            id={question.question + question.choices[1]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[1]}
                            className="font-normal"
                        >
                            B. {question.choices[1]}
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value="C"
                            id={question.question + question.choices[2]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[2]}
                            className="font-normal"
                        >
                            C. {question.choices[2]}
                        </Label>
                    </div>
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value="D"
                            id={question.question + question.choices[3]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[3]}
                            className="font-normal"
                        >
                            D. {question.choices[3]}
                        </Label>
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default QuestionBox;
