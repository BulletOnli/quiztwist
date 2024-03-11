import { QuizSchemaType } from "@/lib/models/quiz.model";
import { CalendarClock, Clock } from "lucide-react";
import Link from "next/link";

const QuizCard = ({ quiz }: { quiz: QuizSchemaType }) => {
  return (
    <Link href={`quiz/${quiz._id}/questions`}>
      <div className="min-w-[12rem] max-w-[12rem] h-[12rem] p-4 flex flex-col flex-grow justify-between bg-white border border-t-4 border-borderColor rounded">
        <div>
          <h1 className="text-sm font-semibold">{quiz?.title}</h1>
          <hr className="my-2" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <p className="text-xs ">{quiz?.deadline.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4" />
            <p className="text-xs ">{quiz?.deadline.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;
