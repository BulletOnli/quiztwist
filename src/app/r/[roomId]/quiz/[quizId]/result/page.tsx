import {
  checkUserEligibility,
  getUserQuizResultAction,
} from "@/lib/actions/quiz.actions";
import { ParamsTypes } from "@/types/paramsTypes";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import QuestionBox from "../questions/_components/QuestionBox";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Result",
};

type ResultPageProps = {
  params: ParamsTypes;
};

const ResultsPage = async ({ params }: ResultPageProps) => {
  const session = await getServerSession(authOptions);
  const isTeacher = session?.user.role === "Teacher";
  const result = await getUserQuizResultAction({ quizId: params.quizId });

  // Checks if the user is already participated in the Quiz
  const isAlreadyAnswered = await checkUserEligibility(params.quizId);

  if (!isAlreadyAnswered.error) {
    redirect(`/r/${params.roomId}/quiz/${params.quizId}/questions`);
  }

  const getScoreTextColor = (scorePercentage: number = 0) => {
    return scorePercentage <= 25
      ? "text-red-500"
      : scorePercentage <= 60
      ? "text-orange-400"
      : "text-green-600";
  };

  return (
    <main className="w-full min-h-[95vh] flex flex-col items-center py-12 bg-gray-100 dark:bg-gray-800">
      <section className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-md dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            You&apos;ve successfully completed the Quiz.
          </p>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Your Score
            </div>
            <div
              className={cn(
                "text-6xl font-bold dark:text-green-400",
                getScoreTextColor(result?.scorePercentage)
              )}
            >
              {result?.scorePercentage}%
            </div>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            You answered <b>{result.score}</b> out of{" "}
            <b>{result.totalQuestions}</b> questions correctly.
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/dashboard"
          >
            Go back to Dashboard
          </Link>
        </div>
      </section>

      <section className="w-full flex flex-col items-center gap-4 p-6">
        {result?.questions?.map((question, index) => (
          <QuestionBox
            question={question.question}
            index={index + 1}
            isTeacher={isTeacher}
            key={index}
            userAnswer={question?.userAnswer}
          />
        ))}
      </section>
    </main>
  );
};

export default ResultsPage;
