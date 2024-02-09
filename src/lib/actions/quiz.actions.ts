"use server";
import { getServerSession } from "next-auth";
import Quiz from "../models/quiz.model";
import connectToDB from "../mongoose";
import getErrorMessage from "@/utils/getErrorMessage";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import authOptions from "@/utils/authOptions";
import moment from "moment";
import mongoose from "mongoose";

// Just checking if the user is already participated in the quiz
export const checkUserEligibility = async (quizId: string) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["_id"]).lean();
    if (!user || !session) throw new Error("Please login first!");

    const quizInfo = await Quiz.findById(quizId).select(["respondents"]).lean();
    if (!quizInfo) throw new Error("Quiz not found!");

    // Checks if the user id is in the respondents array
    const isAlreadyAnswered = quizInfo?.respondents.some(
      (id) => id.toString() === user._id.toString()
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

export const getUpcomingQuizzes = async ({ roomId }: { roomId: string }) => {
  await connectToDB();
  const session = await getServerSession(authOptions);
  const user = await User.findById(session?.user.id).select(["_id"]).lean();
  if (!user || !session) throw new Error("Please login first!");

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  const quiz = await Quiz.find({ room: roomId }).select([
    "deadline",
    "title",
    "respondents",
  ]);

  const filteredQuizzes = quiz
    .filter(
      ({ deadline }) => deadline <= threeDaysLater && deadline >= new Date()
    )
    .filter(({ respondents }) => !respondents.includes(user._id))
    .map(({ _id, deadline, title }) => ({
      _id,
      deadline,
      title,
    }));

  return filteredQuizzes;
};

export const getAllQuizzes = async (roomId: string) => {
  const quizzes = await Quiz.find({ room: roomId })
    .sort({ updatedAt: -1 })
    .select(["title", "deadline"])
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
    .select(["-respondents"]);

  if (!quizInfo) {
    throw new Error("Quiz not found!");
  }

  const deadline = moment(quizInfo?.deadline).format();
  const currentDate = moment().format();

  if (currentDate > deadline && quizInfo.isOpen) {
    quizInfo.isOpen = false;
    await quizInfo.save();
  }

  return quizInfo;
};

type CreateQuizType = {
  formData: FormData;
  roomId: string;
};

export const createQuiz = async ({ formData, roomId }: CreateQuizType) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["_id"]).lean();
    if (!user || !session) throw new Error("Please login first!");

    const newQuiz = await Quiz.create({
      title: formData.get("quizTitle"),
      description: formData.get("quizDescription"),
      teacher: user._id,
      room: roomId,
      deadline: formData.get("deadline"),
      isOpen: false,
    });

    revalidatePath(`/r/${roomId}/classwork`);

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
    const user = await User.findById(session?.user.id).select(["_id"]).lean();
    if (!user || !session) throw new Error("Please login first!");

    const quiz = await Quiz.findById(quizId).select([
      "title",
      "description",
      "deadline",
    ]);
    if (!quiz) throw new Error("Quiz not found!");

    const data = Object.fromEntries(formData) as unknown as {
      quizTitle: string;
      quizDescription?: string;
      deadline: Date;
    };

    quiz.title = data.quizTitle;
    quiz.description = data.quizDescription;
    quiz.deadline = data.deadline;
    await quiz.save();

    revalidatePath(`/quiz/${quizId}`);

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
    const user = await User.findById(session?.user.id).select(["_id"]).lean();
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

    // Counting user score
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

export const toggleQuizStatusAction = async ({
  quizId,
}: {
  quizId: string;
}) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select([
      "_id",
      "answeredQuizzes",
    ]);
    if (!user || !session) throw new Error("Please login first!");

    const quiz = await Quiz.findById(quizId).select(["isOpen"]);
    if (!quiz) throw new Error("Quiz not found!");

    quiz.isOpen = !quiz.isOpen;
    await quiz.save();

    revalidatePath(`/quiz/${quizId}`);

    return {
      message: quiz.isOpen ? "Quiz Opened!" : "Quiz closed!",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const getUserQuizResultAction = async ({
  quizId,
}: {
  quizId: string;
}) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id)
      .select(["_id", "answeredQuizzes"])
      .populate({
        path: "answeredQuizzes",
        populate: {
          path: "quiz",
          select: ["questions"],
        },
      });
    if (!user || !session) throw new Error("Please login first!");

    const answeredQuiz = user.answeredQuizzes.find(
      ({ quiz }) => quiz?._id.toString() === quizId
    ) as
      | {
          quiz: {
            questions: mongoose.Types.ObjectId[];
            _id: mongoose.Schema.Types.ObjectId;
          };
          score: number;
        }
      | undefined;

    const score = answeredQuiz?.score || 0;
    const totalQuestions = answeredQuiz?.quiz.questions.length || 0;
    const scorePercentage = (score / totalQuestions) * 100;

    return {
      score,
      totalQuestions,
      scorePercentage: scorePercentage.toFixed(),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
