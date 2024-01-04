import { QuestionType } from "@/lib/models/question.model";
import QuestionBox from "./QuestionBox";
import { Button } from "../ui/button";

const QuestionList = ({ questions }: { questions: QuestionType[] }) => {
    const formAction = async (formData: FormData) => {
        "use server";
        console.log(formData);
    };

    return (
        <form action={formAction} className="flex flex-col gap-4">
            {questions.map((question, index) => (
                <QuestionBox
                    question={question}
                    index={index + 1}
                    key={question._id.toString()}
                />
            ))}
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default QuestionList;
