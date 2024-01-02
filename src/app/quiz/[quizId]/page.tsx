import { getQuizInfo } from "@/lib/actions/quiz.actions";

type QuizPageProps = {
    params: { quizId: string };
};

const QuizPage = async ({ params }: QuizPageProps) => {
    const quizInfo = await getQuizInfo(params.quizId);

    return (
        <div className="w-full flex flex-col items-center p-6">
            {quizInfo?.title}
        </div>
    );
};

export default QuizPage;
