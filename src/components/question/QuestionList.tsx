"use client";
import { QuestionType } from "@/lib/models/question.model";
import QuestionBox from "./QuestionBox";
import { Button } from "../ui/button";
import { submitQuiz } from "@/lib/actions/quiz.actions";
import { useRouter } from "next/navigation";
import SampleQuestion from "./SampleQuestion";
import { toast } from "sonner";

type QuestionListProps = {
    questions: QuestionType[];
    quizId: string;
    isTeacher: any;
    roomId: string;
};

const QuestionList = ({
    questions,
    quizId,
    isTeacher,
    roomId,
}: QuestionListProps) => {
    const router = useRouter();

    const submitQuizAction = async (formData: FormData) => {
        const response = await submitQuiz(formData, quizId);

        if (response?.error) {
            toast.error(response.error);
        }

        router.push(`quiz/${quizId}/results`);
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
                    roomId={roomId}
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
