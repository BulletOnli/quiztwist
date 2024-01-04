import { QuestionType } from "@/lib/models/question.model";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type QuestionBoxProps = {
    question: QuestionType;
    index: number;
};

const QuestionBox = ({ question, index }: QuestionBoxProps) => {
    return (
        <div className="min-w-[45rem] max-w-full p-6 bg-white border border-l-4 border-r-4 border-borderColor rounded-xl">
            <div className="flex items-center gap-2">
                <p className="text-xs text-gray">{index}.</p>
                <p>{question.question}</p>
            </div>

            <RadioGroup
                name={`question#${question._id}_answer`}
                className="w-full grid grid-cols-2 items-center p-2 mt-2 place-items-center"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value={question.choices[0]}
                            id={question.question + question.choices[0]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[0]}
                            className="font-normal"
                        >
                            {question.choices[0]}
                        </Label>
                    </div>
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value={question.choices[1]}
                            id={question.question + question.choices[1]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[1]}
                            className="font-normal"
                        >
                            {question.choices[1]}
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value={question.choices[2]}
                            id={question.question + question.choices[2]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[2]}
                            className="font-normal"
                        >
                            {question.choices[2]}
                        </Label>
                    </div>
                    <div className="w-full flex items-center space-x-2">
                        <RadioGroupItem
                            value={question.choices[3]}
                            id={question.question + question.choices[3]}
                        />
                        <Label
                            htmlFor={question.question + question.choices[3]}
                            className="font-normal"
                        >
                            {question.choices[3]}
                        </Label>
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default QuestionBox;
