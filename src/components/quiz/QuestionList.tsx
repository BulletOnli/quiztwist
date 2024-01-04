import { QuestionType } from "@/lib/models/question.model";
import QuestionBox from "./QuestionBox";
import { Button } from "../ui/button";
import { submitQuiz } from "@/lib/actions/quiz.actions";
import { redirect } from "next/navigation";

type QuestionListProps = {
    questions: QuestionType[];
    quizId: string;
};

const QuestionList = ({ questions, quizId }: QuestionListProps) => {
    const submitQuizAction = async (formData: FormData) => {
        "use server";
        const response = await submitQuiz(formData, quizId);

        if (response?.error) {
            console.log(response.error);
        }

        // Redirect to results page
        // redirect(`/quiz/${quizId}/results`);
    };

    return (
        <form action={submitQuizAction} className="flex flex-col gap-4">
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
