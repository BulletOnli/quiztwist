import { QuestionType } from "@/lib/models/question.model";
import QuestionBox from "./QuestionBox";
import { Button } from "../../ui/button";
import { submitQuiz } from "@/lib/actions/quiz.actions";
import { redirect } from "next/navigation";
import SampleQuestion from "./SampleQuestion";

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
            {isTeacher && questions.length === 0 && <SampleQuestion />}

            {questions.map((question, index) => (
                <QuestionBox
                    question={question}
                    index={index + 1}
                    quizId={quizId}
                    isTeacher={isTeacher}
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
