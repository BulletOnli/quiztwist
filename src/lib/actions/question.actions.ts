"use server";
import { getServerSession } from "next-auth";
import connectToDB from "../mongoose";
import User from "../models/user.model";
import getErrorMessage from "@/utils/getErrorMessage";
import Question from "../models/question.model";
import Quiz from "../models/quiz.model";
import { revalidatePath } from "next/cache";
import authOptions from "@/utils/authOptions";

type TCreateQuestionAction = {
    formData: FormData;
    quizId: string;
    roomId: string;
};

export const createQuestion = async ({
    formData,
    quizId,
    roomId,
}: TCreateQuestionAction) => {
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

        revalidatePath(`r/${roomId}/quiz/${quizId}`);

        return {
            message: "You've added a Question!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

type TUpdateQuestionAction = {
    formData: FormData;
    quizId: string;
    questionId: string;
    roomId: string;
};

export const updateQuestionAction = async ({
    formData,
    quizId,
    questionId,
    roomId,
}: TUpdateQuestionAction) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        const question = await Question.findById(questionId);

        if (!question) throw new Error("Question not found!");

        const bodyData = Object.fromEntries(formData) as {
            question: string;
            rightAnswer: string;
            optionA: string;
            optionB: string;
            optionC: string;
            optionD: string;
        };

        question.question = bodyData.question;
        question.rightAnswer = bodyData.rightAnswer.toUpperCase();
        question.choices = [
            bodyData.optionA,
            bodyData.optionB,
            bodyData.optionC,
            bodyData.optionD,
        ];

        await question.save();
        revalidatePath(`r/${roomId}/quiz/${quizId}`);

        return {
            message: "Question details updated!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

type TDeleteQuestionAction = {
    quizId: string;
    questionId: string;
    roomId: string;
};

export const deleteQuestionAction = async ({
    quizId,
    roomId,
    questionId,
}: TDeleteQuestionAction) => {
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
        revalidatePath(`r/${roomId}/quiz/${quizId}`);

        return {
            message: "You've deleted a Question!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};
