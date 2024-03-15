"use server";
import { getServerSession } from "next-auth";
import Classroom, { ClassroomType } from "../models/classroom.model";
import connectToDB from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import authOptions from "@/utils/authOptions";
import getErrorMessage from "@/utils/getErrorMessage";

export const getClassrooms = async () => {
  await connectToDB();
  const session = await getServerSession(authOptions);

  const user = await User.findById(session?.user.id)
    .select(["classrooms"])
    .populate({
      path: "classrooms",
      populate: {
        path: "teacher",
        model: User,
        select: ["firstName", "lastName", "profilePic"],
      },
    })
    .lean();

  return user?.classrooms as ClassroomType[];
};

export const getClassroomData = async (id: string) => {
  await connectToDB();
  const classroom = await Classroom.findById(id)
    .populate([
      {
        path: "teacher",
        model: User,
        select: ["profilePic", "firstName", "lastName"],
      },
      {
        path: "students",
        model: User,
        select: ["profilePic", "firstName", "lastName"],
      },
    ])
    .lean();

  return classroom;
};

export const createClassroomAction = async (formData: FormData) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select([
      "classrooms",
      "subscription",
    ]);
    if (!user || !session) throw new Error("Please login first!");

    if (user.subscription === "Basic" && user.classrooms.length >= 10) {
      throw new Error("Maximum classrooms reached for Basic subscription.");
    }

    const classroom = await Classroom.create({
      subject: formData.get("subject"),
      description: formData.get("description"),
      section: formData.get("section"),
      teacher: session?.user.id,
    });

    user.classrooms.push(classroom._id);
    await user.save();

    revalidatePath("/dashboard");

    return {
      message: "New Classroom created!",
      roomId: classroom._id.toString(),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const joinClassroomAction = async (formData: FormData) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["classrooms"]);
    if (!user || !session) throw new Error("Please login first!");

    const inputCode = formData.get("classCode") as string;

    const classrooms = await Classroom.find().select(["_id"]);

    for (const classroom of classrooms) {
      const classCode = classroom._id.toString().slice(-5);

      if (classCode === inputCode) {
        const targetClassroom = await Classroom.findById(classroom._id).select([
          "students",
        ]);

        if (!targetClassroom) {
          throw new Error("No classroom found! ");
        }

        const isAlreadyJoined =
          targetClassroom?.students.includes(user._id) &&
          user.classrooms.includes(targetClassroom._id);

        if (!isAlreadyJoined) {
          // Add user to the classroom's students array
          targetClassroom.students.push(user._id);
          await targetClassroom.save();
          // Add classroom to the user's classrooms array
          user.classrooms.push(targetClassroom._id);
          await user.save();

          revalidatePath("/dashboard");
          return {
            message: "Successfully joined!",
            roomId: classroom._id.toString(),
          };
        } else {
          throw new Error("You already joined this classroom");
        }
      }
    }

    throw new Error("Invalid Code, Try again!");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const addStudentToClassroomAction = async ({
  formData,
  roomId,
}: {
  formData: FormData;
  roomId: string;
}) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const loggedInUser = await User.findById(session?.user.id)
      .select(["_id"])
      .lean();
    if (!loggedInUser || !session) throw new Error("Please login first!");

    const targetStudent = await User.findOne({
      email: formData.get("studentEmail") as string,
    }).select(["classrooms", "role"]);

    if (!targetStudent) {
      throw new Error("No user found!");
    }
    if (targetStudent.role === "Teacher") {
      throw new Error("Only student is allowed!");
    }

    const classroom = await Classroom.findById(roomId).select(["students"]);
    if (!classroom) {
      throw new Error("Classroom not found!");
    }

    if (classroom.students.includes(targetStudent._id)) {
      throw new Error("Student is already in this classroom!");
    }

    targetStudent.classrooms.push(classroom._id);
    await targetStudent.save();
    classroom.students.push(targetStudent._id);
    await classroom.save();

    revalidatePath(`/r/${roomId}/people`);

    return {
      message: "You added a new Student!",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateClassroomAction = async (
  formData: FormData,
  roomId: string
) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["classrooms"]);
    if (!user || !session) throw new Error("Please login first!");

    const classroom = await Classroom.findById(roomId);
    if (!classroom) throw new Error("Classroom not found!");

    const data = Object.fromEntries(formData) as {
      subject: string;
      description: string;
      section: string;
    };

    classroom.subject = data.subject;
    classroom.description = data.description;
    classroom.section = data.section;
    await classroom.save();

    revalidatePath(`/r/${roomId}`);

    return {
      message: "Update classroom Successfully",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteClassroomAction = async (
  formData: FormData,
  roomId: string
) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["classrooms"]);
    if (!user || !session) throw new Error("Please login first!");

    const deleteConfirmed = formData.get("confirmDelete") === "Confirm";

    if (!deleteConfirmed) {
      throw new Error("Please confirm before deleting!");
    }

    await Classroom.findByIdAndDelete(roomId);
    user.classrooms = user.classrooms.filter(
      (classroom) => classroom.toString() !== roomId
    ) as any;
    await user.save();

    revalidatePath("/dashboard");

    return {
      message: "Classroom deleted!",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const leaveClassroomAction = async (
  formData: FormData,
  roomId: string
) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["classrooms"]);
    if (!user || !session) throw new Error("Please login first!");

    const deleteConfirmed = formData.get("confirmLeave") === "Confirm";

    if (!deleteConfirmed) {
      throw new Error("Please confirm before Leaving!");
    }

    const classroom = await Classroom.findById(roomId).select(["students"]);
    if (!classroom) {
      throw new Error("Classroom not found!");
    }

    // Remove in classroom's students list
    classroom.students = classroom.students.filter(
      (student) => student.toString() !== user._id.toString()
    ) as any;
    await classroom.save();

    // Remove in user's classrooms list
    user.classrooms = user.classrooms.filter(
      (classroom) => classroom.toString() !== roomId
    ) as any;
    await user.save();

    revalidatePath("/dashboard");

    return {
      message: "You leaved the classroom!",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
