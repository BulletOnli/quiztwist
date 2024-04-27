"use server";

import getErrorMessage from "@/utils/getErrorMessage";
import connectToDB from "../mongoose";
import User from "../models/user.model";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import AnnouncementSchema, {
  AnnouncementType,
} from "../models/announcement.model";
import { revalidatePath } from "next/cache";

type NewAnnouncementActionType = {
  formData: FormData;
  roomId: string;
};

export const getAllAnnouncements = async ({
  roomId,
}: {
  roomId: string;
}): Promise<AnnouncementType[]> => {
  const announcements = await AnnouncementSchema.find({
    room: roomId,
  })
    .populate({
      path: "author",
      select: ["email", "username", "profilePic", "firstName", "lastName"],
    })
    .sort({ updatedAt: -1 });

  return JSON.parse(JSON.stringify(announcements));
};

//todo: SEND EMAIL TO ALL STUDENTS
export const newAnnouncementAction = async ({
  formData,
  roomId,
}: NewAnnouncementActionType) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["_id"]);

    if (!user || !session) throw new Error("Please login first!");

    const value = formData.get("content") as string;

    await AnnouncementSchema.create({
      room: roomId,
      author: user._id,
      content: value?.replace(/\n/g, "<br>"),
    });

    revalidatePath("/announcements");

    return {
      message: "You've added new announcement",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteAnnouncementAction = async ({
  announcementId,
}: {
  announcementId: string;
}) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["_id"]);

    if (!user || !session) throw new Error("Please login first!");

    await AnnouncementSchema.findByIdAndDelete(announcementId);
    revalidatePath("/announcements");

    return {
      message: "Delete successfullly!",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
