"use client";
import { Input } from "@/components/ui/input";
import { createQuiz } from "@/lib/actions/quiz.actions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import NewQuizFormBtn from "./NewQuizFormBtn";

const NewQuizForm = () => {
    const roomId = usePathname().split("/")[2];
    const router = useRouter();

    const newQuizAction = async (formData: FormData) => {
        const response = await createQuiz(formData, roomId);

        if (response.error) {
            return toast.error(response.error);
        }

        toast.success(response.message);
        router.push(`/quiz/${response.quizId}`);
    };

    return (
        <form action={newQuizAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">Quiz Title</p>
                <Input
                    id="quizTitle"
                    name="quizTitle"
                    placeholder="Enter a Quiz title"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">Description (optional)</p>
                <Input
                    id="quizDescription"
                    name="quizDescription"
                    placeholder="Enter a short description"
                />
            </div>
            <NewQuizFormBtn />
        </form>
    );
};

export default NewQuizForm;
