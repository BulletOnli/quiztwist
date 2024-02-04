import QuestionList from "@/components/question/QuestionList";
import { checkUserEligibility, getQuizInfo } from "@/lib/actions/quiz.actions";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import EditQuizDialog from "@/components/quiz/EditQuizDialog";
import QuizSettingsDialog from "@/components/quiz/settings/QuizSettingsDialog";
import ReportBugDialog from "@/components/quiz/ReportBugDialog";
import NewQuestionDialog from "@/components/question/NewQuestionDialog";
import NotFound from "@/app/not-found";
import { CalendarClock, Clock } from "lucide-react";

type QuizPageProps = {
  params: { roomId: string; quizId: string };
};

const QuizPage = async ({ params }: QuizPageProps) => {
  const session = await getServerSession(authOptions);
  const isTeacher = session?.user.role === "Teacher";

  // Checks if the user is already participated in the Quiz
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
  if (!quizInfo) return <NotFound />;

  // Checks if this quiz is open for respondents or not
  if (!isTeacher) {
    if (!quizInfo?.isOpen) {
      return (
        <main className="w-full relative min-h-screen bg-secondary flex justify-center p-6">
          <p>Currently this quiz is not open!</p>
        </main>
      );
    }
  }

  return (
    <main className="w-full relative min-h-screen bg-secondary flex justify-center p-6">
      <div className="w-[40rem] max-h-[30rem] sticky top-[85px] flex flex-col items-center">
        <div className="relative w-full flex flex-col justify-center p-8 bg-white border border-t-8 border-borderColor rounded-xl">
          <EditQuizDialog
            quizInfo={JSON.stringify(quizInfo ?? {})}
            quizId={params.quizId}
          />

          <h1 className="text-xl font-semibold">{quizInfo?.title}</h1>
          <p className="text-sm ">{quizInfo?.description}</p>
          <hr className="my-4" />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <p className="text-xs ">
                {quizInfo?.deadline.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CalendarClock className="w-4 h-4" />
              <p className="text-xs ">
                {quizInfo?.deadline.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-2 mt-4">
          {isTeacher && (
            <>
              <NewQuestionDialog quizId={params.quizId} />
              <QuizSettingsDialog
                isOpen={quizInfo?.isOpen}
                roomId={params.roomId}
                quizId={params.quizId}
              />
            </>
          )}
          <ReportBugDialog />
        </div>
      </div>

      <div className="w-full flex flex-col items-center px-10">
        <QuestionList
          questionsString={JSON.stringify(quizInfo?.questions ?? [])}
          quizId={params.quizId}
          roomId={params.roomId}
          isTeacher={isTeacher}
        />
      </div>
    </main>
  );
};

export default QuizPage;
