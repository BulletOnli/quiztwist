import { getUpcomingQuizzes } from "@/lib/actions/quiz.actions";
import { QuizSchemaType } from "@/lib/models/quiz.model";
import Link from "next/link";

const UpcomingQuiz = async ({ roomId }: { roomId: string }) => {
  const upcomingQuizzes = await getUpcomingQuizzes({ roomId });

  return (
    <div className="w-[14rem] min-h-[7rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary-gray rounded-lg">
      <p className="text-sm font-medium">Upcoming Quizzes</p>
      <ul className="ml-4 text-xs list-disc">
        {upcomingQuizzes?.length == 0 && (
          <p className="text-center mt-3">No upcoming quizzes.</p>
        )}
        {upcomingQuizzes?.map((upcoming) => (
          <Link
            href={`/r/${roomId}/quiz/${upcoming._id.toString()}/questions`}
            key={upcoming._id.toString()}
            className="hover:underline"
          >
            <li>{upcoming.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingQuiz;
