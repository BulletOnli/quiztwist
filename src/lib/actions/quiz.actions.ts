"use server";
import { getServerSession } from "next-auth";
import Quiz from "../models/quiz.model";
import connectToDB from "../mongoose";
import getErrorMessage from "@/utils/getErrorMessage";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import authOptions from "@/utils/authOptions";
import { redirect } from "next/navigation";

// Just checking if the user is already participated in the quiz
export const checkUserEligibility = async (quizId: string) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        const quizInfo = await Quiz.findById(quizId)
            .select(["respondents"])
            .populate({
                path: "respondents",
                select: "_id",
            })
            .lean();

        // Checks if the user id is in the respondents array
        const isAlreadyAnswered = quizInfo?.respondents.some(
            (respondent) => respondent._id.toString() === user._id.toString()
        );

        if (isAlreadyAnswered) {
            throw new Error("You already answered this Quiz!");
        }

        return {
            message: "You are able to participate in this Quiz!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

export const getAllQuizzes = async (roomId: string) => {
    const quizzes = await Quiz.find({ room: roomId })
        .sort({ updatedAt: -1 })
        .lean();

    return quizzes;
};

export const getQuizInfo = async (quizId: string) => {
    const quizInfo = await Quiz.findById(quizId)
        .populate([
            {
                path: "questions",
                model: Question,
            },
            {
                path: "teacher",
                select: ["username"],
                model: User,
            },
        ])
        .lean();

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

        revalidatePath(`/room/${roomId}`);

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

export const updateQuizAction = async ({
    formData,
    quizId,
}: {
    formData: FormData;
    quizId: string;
}) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        const quiz = await Quiz.findById(quizId).select([
            "title",
            "description",
        ]);
        if (!quiz) throw new Error("Quiz not found!");

        const data = Object.fromEntries(formData) as {
            quizTitle: string;
            quizDescription?: string;
        };

        quiz.title = data.quizTitle;
        quiz.description = data.quizDescription;
        await quiz.save();

        revalidatePath(`quiz/${quizId}`);

        return {
            message: "Quiz info updated!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

export const deleteQuizAction = async ({ quizId }: { quizId: string }) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id)
            .select(["_id"])
            .lean();
        if (!user || !session) throw new Error("Please login first!");

        await Quiz.findByIdAndDelete(quizId);

        revalidatePath(`/quiz/${quizId}`);

        return {
            message: "You deleted the Quiz!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

export const submitQuiz = async (formData: FormData, quizId: string) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id).select([
            "_id",
            "answeredQuizzes",
        ]);

        if (!user || !session) throw new Error("Please login first!");

        const quizInfo = await Quiz.findById(quizId)
            .populate({
                path: "questions",
                select: ["rightAnswer"],
                model: Question,
            })
            .select(["questions", "respondents", "isOpen"]);

        if (!quizInfo) {
            throw new Error("An error occured! Quiz not found!");
        }

        let SCORE = 0;

        for (let question of quizInfo?.questions) {
            // The answer of the user per question
            const user_answer = formData.get(
                `question#${question._id.toString()}_answer`
            );

            if (question.rightAnswer === user_answer) SCORE++;
        }

        // Add the user to the respondents array of the quiz
        quizInfo?.respondents.push(user._id);
        await quizInfo.save();

        // Add the quiz to the answeredQuizzes of the user
        user?.answeredQuizzes.push({
            quiz: quizInfo._id,
            score: SCORE,
        });
        await user.save();

        return {
            message: "Thank you for participating in this Quiz!",
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};
