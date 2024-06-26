import QuizTemplates from "@/app/r/[roomId]/(room)/classwork/_components/QuizTemplates";
import UpcomingQuiz from "@/app/r/[roomId]/(room)/classwork/_components/UpcomingQuiz";
import Classcode from "@/app/r/[roomId]/(room)/classwork/_components/Classcode";
import { getServerSession } from "next-auth";
import { getAllQuizzes } from "@/lib/actions/quiz.actions";
import authOptions from "@/utils/authOptions";
import QuizCard from "@/app/r/[roomId]/(room)/classwork/_components/QuizCard";

type ClassworkPageProps = {
  params: {
    roomId: string;
  };
};

const ClassworkPage = async ({ params }: ClassworkPageProps) => {
  const session = await getServerSession(authOptions);
  const isStudent = session?.user.role === "Student";
  const quizzes = await getAllQuizzes(params.roomId);

  return (
    <main className="w-full max-w-6xl mx-auto flex gap-10 p-6">
      <div className="flex flex-col items-center gap-4">
        <UpcomingQuiz roomId={params.roomId} />
        <Classcode roomId={params.roomId} />
      </div>

      <div className="w-full flex flex-col">
        {!isStudent && (
          <>
            <p className="mb-2 font-medium">Start a new Quiz</p>
            <QuizTemplates />
          </>
        )}
        <div className="w-full flex flex-col ">
          <p className="font-medium">Recent Quiz</p>
          <div className="w-full flex flex-wrap items-center gap-4 mt-4">
            {quizzes.length === 0 && (
              <p className="text-gray text-sm">No Quiz available</p>
            )}
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id.toString()} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClassworkPage;
