import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import QuestionList from "@/components/quiz/QuestionList";
import NewQuestionDialog from "@/components/quiz/question/NewQuestionDialog";
import { Button } from "@/components/ui/button";
import { checkUserEligibility, getQuizInfo } from "@/lib/actions/quiz.actions";
import { getServerSession } from "next-auth";

type QuizPageProps = {
    params: { quizId: string };
};

const QuizPage = async ({ params }: QuizPageProps) => {
    const session = await getServerSession(authOptions);
    const isTeacher = session?.user.role === "Teacher";

    if (!isTeacher) {
        const isAlreadyAnswered = await checkUserEligibility(params.quizId);

        if (isAlreadyAnswered.error) {
            return (
                <main className="w-full relative min-h-screen bg-secondary flex justify-center p-6">
                    <p>{isAlreadyAnswered.error}</p>
                </main>
            );
        }
    }

    const quizInfo = await getQuizInfo(params.quizId);

    return (
        <main className="w-full relative min-h-screen bg-secondary flex justify-center p-6">
            <div className="w-[40rem] max-h-[30rem] sticky top-[85px] flex flex-col items-center">
                <div className="w-full flex flex-col justify-center p-8 bg-white border border-t-8 border-borderColor rounded-xl">
                    <h1 className="text-xl font-semibold">{quizInfo?.title}</h1>
                    <hr className="my-2" />
                    <p className="text-sm ">{quizInfo?.description}</p>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mt-4">
                    {isTeacher && <NewQuestionDialog />}
                    <Button className="w-full" variant="outline">
                        Settings
                    </Button>
                </div>
            </div>
            <div className="w-full flex flex-col items-center px-10">
                <QuestionList
                    questions={quizInfo?.questions || []}
                    quizId={params.quizId}
                />
            </div>
        </main>
    );
};

export default QuizPage;