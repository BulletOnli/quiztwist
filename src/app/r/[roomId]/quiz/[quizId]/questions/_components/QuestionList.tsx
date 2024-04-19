"use client";
import { QuestionType } from "@/lib/models/question.model";
import QuestionBox from "./QuestionBox";
import { submitQuiz } from "@/lib/actions/quiz.actions";
import { useParams, useRouter } from "next/navigation";
import SampleQuestion from "./SampleQuestion";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { ParamsTypes } from "@/types/paramsTypes";

type QuestionListProps = {
  questions: QuestionType[];
  isTeacher: boolean;
};

const QuestionList = ({ questions, isTeacher }: QuestionListProps) => {
  const { quizId, roomId } = useParams<ParamsTypes>();

  const [life, setLife] = useState(3);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const submitQuizAction = async (formData: FormData) => {
    const response = await submitQuiz(formData, quizId);

    if (response?.error) {
      return toast.error(response.error);
    }

    router.replace(`/r/${roomId}/quiz/${quizId}/result`);
    toast.success("Thanks for participating!");
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setLife((prev) => prev - 1);
        console.log("Page is hidden");
      } else {
        console.log("Page is visible");
      }
    };

    !isTeacher &&
      document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      !isTeacher &&
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
    };
  }, []);

  useEffect(() => {
    if (!isTeacher && life <= 0) {
      alert(
        "You violate changing tabs for 3 times. We decided to automatically submit your Quiz!"
      );
      formRef.current?.requestSubmit();
    } else if (!isTeacher && life <= 2) {
      alert(
        `Warning! Changing tabs is not allowed! You only have ${life} lives left.`
      );
    }
  }, [life]);

  return (
    <form
      ref={formRef}
      action={submitQuizAction}
      className="flex flex-col gap-4"
    >
      {isTeacher && questions.length === 0 && <SampleQuestion />}

      {questions.map((question, index) => (
        <QuestionBox
          question={question}
          index={index + 1}
          isTeacher={isTeacher}
          key={question._id.toString()}
        />
      ))}
      {!isTeacher && questions.length !== 0 && (
        <SubmitBtn defaultName="Submit" onLoadingName="Submiting..." />
      )}
    </form>
  );
};

export default QuestionList;
