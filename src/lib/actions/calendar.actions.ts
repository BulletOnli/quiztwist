"use server";

import { getServerSession } from "next-auth";
import Classroom from "../models/classroom.model";
import Quiz from "../models/quiz.model";
import User from "../models/user.model";
import authOptions from "@/utils/authOptions";
import mongoose from "mongoose";
import connectToDB from "../mongoose";

export const getAllEvents = async (): Promise<
  | []
  | [
      {
        _id: string;
        room: {
          _id: string;
          students: string[];
        };
        deadline: Date;
        title: string;
      }
    ]
> => {
  await connectToDB();
  const session = await getServerSession(authOptions);
  const user = await User.findById(session?.user.id).select(["_id"]).lean();
  if (!user) {
    return [];
  }

  const quizzes = (await Quiz.find()
    .select(["room", "deadline", "title"])
    .populate({
      path: "room",
      select: ["students"],
      model: Classroom,
    })
    .lean()) as [
    {
      _id: string;
      room: {
        _id: string;
        students: mongoose.Types.ObjectId[];
      };
      deadline: Date;
      title: string;
    }
  ];

  const events = quizzes.filter((quiz) =>
    quiz.room.students.some(
      (student) => student.toString() === user._id.toString()
    )
  );

  return JSON.parse(JSON.stringify(events));
};
