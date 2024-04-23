import { QuestionType } from "@/lib/models/question.model";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import EditQuestionDialog from "./EditQuestionDialog";
import { cn } from "@/lib/utils";

type QuestionBoxProps = {
  question: QuestionType | any;
  index: number;
  isTeacher: boolean;
  userAnswer?: string | null;
};

const QuestionBox = ({
  question,
  index,
  isTeacher,
  userAnswer,
}: QuestionBoxProps) => {
  const borderColorClass =
    userAnswer !== undefined &&
    (userAnswer === question.rightAnswer
      ? "border-green-600"
      : "border-red-600");

  return (
    <div
      className={cn(
        "relative w-full  min-w-[45rem] max-w-full p-6 bg-white border border-borderColor border-l-4 border-r-4 rounded-xl",
        borderColorClass
      )}
    >
      {isTeacher && (
        <div className="absolute -right-4 -top-5 px-2 py-1 flex items-center gap-2 bg-white border border-borderColor rounded-full">
          <EditQuestionDialog question={question} />
          <DeleteQuestionDialog questionId={question?._id.toString()} />
        </div>
      )}

      <div className="flex items-center gap-2">
        <p className="text-xs text-gray">{index}.</p>
        <p>{question?.question}</p>
      </div>

      <RadioGroup
        name={`question#${question?._id}_answer`}
        className="w-full grid grid-cols-2 gap-4 items-center p-2 mt-2"
        defaultValue={userAnswer || undefined}
        disabled={
          userAnswer !== undefined && (userAnswer !== "" || userAnswer == null)
        } // Disable if there is a userAnswer prop value AND userAnswer is not equal to null OR empty string
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex items-center space-x-2">
            <RadioGroupItem
              value="A"
              id={question?.question + question?.choices?.[0]}
            />
            <Label
              htmlFor={question?.question + question?.choices?.[0]}
              className="font-normal"
            >
              A. {question?.choices?.[0]}
            </Label>
          </div>
          <div className="w-full flex items-center space-x-2">
            <RadioGroupItem
              value="B"
              id={question?.question + question?.choices?.[1]}
            />
            <Label
              htmlFor={question?.question + question?.choices?.[1]}
              className="font-normal"
            >
              B. {question?.choices?.[1]}
            </Label>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex items-center space-x-2">
            <RadioGroupItem
              value="C"
              id={question?.question + question?.choices?.[2]}
            />
            <Label
              htmlFor={question?.question + question?.choices?.[2]}
              className="font-normal"
            >
              C. {question?.choices?.[2]}
            </Label>
          </div>
          <div className="w-full flex items-center space-x-2">
            <RadioGroupItem
              value="D"
              id={question?.question + question?.choices?.[3]}
            />
            <Label
              htmlFor={question?.question + question?.choices?.[3]}
              className="font-normal"
            >
              D. {question?.choices?.[3]}
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionBox;
