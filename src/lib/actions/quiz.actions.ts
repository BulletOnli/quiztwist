"use server";
import { getServerSession } from "next-auth";
import Quiz from "../models/quiz.model";
import connectToDB from "../mongoose";
import { getErrorMessage } from "../utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";

export const getAllQuizzes = async (roomId: string) => {
    const quizzes = await Quiz.find({ room: roomId })
        .sort({ updatedAt: -1 })
        .lean();

    return quizzes;
};

export const getQuizInfo = async (quizId: string) => {
    const quizInfo = await Quiz.findById(quizId).populate({
        path: "questions",
        model: Question,
    });

    return quizInfo;
};

export const createQuiz = async (formData: FormData, roomId: string) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        const isTitleAvailable = await Quiz.find({
            title: formData.get("quizTitle"),
        })
            .select(["title"])
            .lean();

        if (isTitleAvailable.length !== 0) {
            throw new Error("Title already exist!");
        }

        const newQuiz = await Quiz.create({
            title: formData.get("quizTitle"),
            description: formData.get("quizDescription"),
            teacher: user._id,
            room: roomId,
            isOpen: false,
        });

        revalidatePath(`/room/${roomId}/classwork`);

        return {
            message: "Quiz created!",
            quizId: newQuiz._id.toString(),
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};
