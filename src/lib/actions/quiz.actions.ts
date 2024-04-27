"use server";
import { getServerSession } from "next-auth";
import Quiz from "../models/quiz.model";
import connectToDB from "../mongoose";
import getErrorMessage from "@/utils/getErrorMessage";
import User, { UserType } from "../models/user.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import authOptions from "@/utils/authOptions";
import moment from "moment";
import mongoose from "mongoose";
import { unknown } from "zod";
import { transforter } from "@/utils/nodemailer";
import Classroom from "../models/classroom.model";
import environments from "../../../environments/environments";

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
  await connectToDB();
  const quizzes = await Quiz.find({ room: roomId })
    .sort({ updatedAt: -1 })
    .select(["title", "deadline"])
    .lean();

  return quizzes;
};

export const getQuizInfo = async (quizId: string) => {
  await connectToDB();
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

  const deadline = moment(quizInfo?.deadline).format();
  const currentDate = moment().format();

  if (currentDate > deadline && quizInfo?.isOpen) {
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
    });

    revalidatePath(`/r/${roomId}/classwork`);

    const classroom = await Classroom.findById(roomId)
      .select(["students", "teacher"])
      .populate([
        {
          path: "students",
          select: ["email"],
        },
        {
          path: "teacher",
          select: ["firstName", "lastName", "email"],
        },
      ]);

    classroom?.students.forEach(async (student: UserType) => {
      await transforter.sendMail({
        from: `${classroom?.teacher.email}`,
        to: student.email,
        subject: `New Quiz: "${formData.get("quizTitle")}"`,
        html: `
        <main style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 6rem;">
          <div style="display: flex; flex-direction: column; padding: 1rem;">
            <div style="min-width: 20rem; max-width: 40rem; padding: 2rem; border: 1px solid #CED4DA; border-radius: 0.5rem;">
              <p style="font-weight: bold">Title: ${formData.get(
                "quizTitle"
              )}</p>
              <p style="font-size: 14px">Description: ${formData.get(
                "quizDescription"
              )}</p>

              <p style="font-size: 12px; margin-top: 10px">Deadline: ${moment(
                newQuiz.deadline
              ).format("LLL")}</p>
              <a href='${
                environments.NEXT_PUBLIC_SERVER_URL
              }/r/${roomId}/quiz/${newQuiz._id.toString()}/questions'>Answer now</a>
            </div>
          </div>
        </main>
        `,
      });
    });

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
    let answeredQuizDetails = {
      quiz: quizId,
      score: 0,
      questions: [],
    } as {
      quiz: string;
      score: number;
      questions: any;
    };

    // Counting user score
    for (let question of quizInfo?.questions) {
      // The answer of the user per question
      const user_answer = formData.get(
        `question#${question._id.toString()}_answer`
      ) as string;

      answeredQuizDetails.questions.push({
        question: question?._id.toString(),
        userAnswer: user_answer,
        isCorrect: question.rightAnswer === user_answer,
      });

      if (question.rightAnswer === user_answer) {
        SCORE++;
        answeredQuizDetails.score++;
      }
    }

    // Add the user to the respondents array of the quiz
    quizInfo?.respondents.push(user._id);
    await quizInfo.save();

    // Add the quiz to the answeredQuizzes of the user
    user?.answeredQuizzes.push(answeredQuizDetails);
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

    const quiz = await Quiz.findById(quizId).select(["isOpen", "deadline"]);
    if (!quiz) throw new Error("Quiz not found!");

    const deadline = moment(quiz?.deadline).format();
    const currentDate = moment().format();

    if (currentDate > deadline) {
      throw new Error("Deadline is over!");
    }

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
          path: "questions",
          populate: {
            path: "question",
          },
          // select: ["title", "description"],
        },
      });
    if (!user || !session) throw new Error("Please login first!");

    const answeredQuiz = user.answeredQuizzes.find(
      ({ quiz }) => quiz?._id.toString() === quizId
    );

    if (!answeredQuiz) throw new Error("Please answer the quiz first!");

    const score = answeredQuiz?.score || 0;
    const totalQuestions = answeredQuiz?.questions.length || 0;
    const scorePercentage = (score / totalQuestions) * 100;

    return {
      score,
      totalQuestions,
      scorePercentage: Number(scorePercentage.toFixed()),
      questions: answeredQuiz.questions,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
