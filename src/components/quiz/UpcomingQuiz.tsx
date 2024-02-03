import { QuizSchemaType } from "@/lib/models/quiz.model";
import { Button } from "../ui/button";
import moment from "moment";
import Link from "next/link";
import { checkUserEligibility } from "@/lib/actions/quiz.actions";

type UpcomingQuizProps = { quizzes: QuizSchemaType[]; roomId: string };

const UpcomingQuiz = ({ quizzes, roomId }: UpcomingQuizProps) => {
  const today = new Date();
  const threeDaysLater = new Date(today.setDate(today.getDate() + 3));

  let upcomingQuizzes = quizzes
    ?.map(({ deadline, _id, title, respondents }) => ({
      deadline,
      _id,
      title,
      respondents,
    }))
    .filter(({ deadline }) => deadline <= threeDaysLater);

  return (
    <div className="w-[14rem] min-h-[7rem] p-3 flex flex-col gap-2 border border-borderColor bg-secondary-gray rounded-lg">
      <p className="text-sm font-medium">Upcoming Quizzes</p>
      <ul className="ml-4 text-xs list-disc">
        {upcomingQuizzes.length == 0 && (
          <p className="text-center mt-3">No upcoming quizzes.</p>
        )}
        {upcomingQuizzes.map((upcoming) => (
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
