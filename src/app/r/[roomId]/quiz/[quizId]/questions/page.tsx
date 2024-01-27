import QuestionList from "@/components/question/QuestionList";
import { checkUserEligibility, getQuizInfo } from "@/lib/actions/quiz.actions";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import EditQuizDialog from "@/components/quiz/edit-quiz/EditQuizDialog";
import QuizSettingsDialog from "@/components/quiz/settings/QuizSettingsDialog";
import ReportBugDialog from "@/components/quiz/ReportBugDialog";
import NewQuestionDialog from "@/components/question/NewQuestionDialog";

type QuizPageProps = {
    params: { roomId: string; quizId: string };
};

const QuizPage = async ({ params }: QuizPageProps) => {
    const session = await getServerSession(authOptions);
    const isTeacher = session?.user.role === "Teacher";

    // Checks if the user is already participated in the Quiz
    // Blocks the user from answering again
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
                <div className="relative w-full flex flex-col justify-center p-8 bg-white border border-t-8 border-borderColor rounded-xl">
                    <EditQuizDialog
                        quizInfo={JSON.stringify(quizInfo)}
                        quizId={params.quizId}
                    />

                    <h1 className="text-xl font-semibold">{quizInfo?.title}</h1>
                    <p className="text-sm ">{quizInfo?.description}</p>
                    <hr className="my-2" />
                    <p className="text-xs">
                        Prepared by: {quizInfo?.teacher.username}
                    </p>
                </div>

                <div className="w-full flex flex-col items-center gap-2 mt-4">
                    {isTeacher && (
                        <NewQuestionDialog
                            quizId={params.quizId}
                            roomId={params.roomId}
                        />
                    )}
                    <QuizSettingsDialog quizId={params.quizId} />
                    <ReportBugDialog />
                </div>
            </div>

            <div className="w-full flex flex-col items-center px-10">
                <QuestionList
                    questions={quizInfo?.questions || []}
                    quizId={params.quizId}
                    isTeacher={isTeacher}
                    roomId={params.roomId}
                />
            </div>
        </main>
    );
};

export default QuizPage;
