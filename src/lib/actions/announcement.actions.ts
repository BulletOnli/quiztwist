"use server";
import getErrorMessage from "@/utils/getErrorMessage";
import connectToDB from "../mongoose";
import User, { UserType } from "../models/user.model";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import AnnouncementSchema, {
  AnnouncementType,
} from "../models/announcement.model";
import { revalidatePath } from "next/cache";
import Classroom from "../models/classroom.model";
import { transforter } from "@/utils/nodemailer";
import { UploadFileResponse } from "@/types/uploadthingTypes";
import environments from "../../../environments/environments";

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

type NewAnnouncementActionType = {
  formData: FormData;
  roomId: string;
  files: UploadFileResponse[];
};

export const newAnnouncementAction = async ({
  formData,
  roomId,
  files,
}: NewAnnouncementActionType) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["_id", "email"]);

    if (!user || !session) throw new Error("Please login first!");

    const content = formData.get("content") as string;

    await AnnouncementSchema.create({
      room: roomId,
      author: user._id,
      content: content?.replace(/\n/g, "<br>"),
      files,
    });

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

    classroom?.students?.forEach(async (student: UserType) => {
      await transforter.sendMail({
        from: `${user.email}`,
        to: student.email,
        subject: `New announcement: "${content.slice(0, 50)}"`,
        html: `<a href='${
          environments.NEXT_PUBLIC_SERVER_URL
        }/r/${roomId}/announcements' style="color: black; text-decoration: none; font-size: 14px">
          <main style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 6rem;">
            <div style="display: flex; flex-direction: column; padding: 1rem; border: 1px solid #CED4DA; border-radius: 0.5rem;"
            >
              ${content?.replace(/\n/g, "<br>")}
            </div>
            <div style="margin-top: 10px; display: flex; flex-direction: column; padding: 1rem; border: 1px solid #CED4DA; border-radius: 0.5rem;"
            >
              *Includes ${files.length} files
            </div>
          </main>
        </a>
        `,
      });
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
}): Promise<{
  message?: string;
  error?: string;
}> => {
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
