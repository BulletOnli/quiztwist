"use server";
import { getServerSession } from "next-auth";
import connectToDB from "../mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "../models/user.model";
import getErrorMessage from "@/utils/getErrorMessage";
import Question from "../models/question.model";
import Quiz from "../models/quiz.model";
import { revalidatePath } from "next/cache";

export const createQuestion = async (formData: FormData, quizId: string) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        const quiz = await Quiz.findById(quizId).select(["questions"]);

        const newQuestion = await Question.create({
            question: formData.get("question"),
            rightAnswer: formData.get("rightAnswer")?.toString().toUpperCase(),
            choices: [
                formData.get("optionA"),
                formData.get("optionB"),
                formData.get("optionC"),
                formData.get("optionD"),
            ],
        });

        quiz?.questions.push(newQuestion._id);
        await quiz?.save();

        revalidatePath(`/quiz/${quizId}/questions`);

        return {
            message: "You've added a Question!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        const quiz = await Quiz.findById(quizId).select(["questions"]);

        if (!quiz) {
            throw new Error("Quiz not found!");
        }

        const filteredQuestions: any = quiz.questions.filter(
            (question) => question._id.toString() !== questionId
        );

        quiz.questions = filteredQuestions;
        await quiz.save();
        await Question.findByIdAndDelete(questionId);
        revalidatePath(`/quiz/${quizId}/questions`);

        return {
            message: "You've deleted a Question!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};
