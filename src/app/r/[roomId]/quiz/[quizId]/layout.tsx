import { getQuizInfo } from "@/lib/actions/quiz.actions";
import { Metadata } from "next";

type QuizLayoutProps = {
  children: React.ReactNode;
  params: { quizId: string };
};

export async function generateMetadata({
  params,
}: QuizLayoutProps): Promise<Metadata> {
  const response = await getQuizInfo(params.quizId);

  return {
    title: {
      default: response?.title || "",
      template: `${response?.title} | %s - QuizTwist`,
    },
  };
}

export default async function QuizLayout({ children }: QuizLayoutProps) {
  return <>{children}</>;
}
