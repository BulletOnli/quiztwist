"use server";
import { getServerSession } from "next-auth";
import Classroom, { ClassroomType } from "../models/classroom.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
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
                select: ["firstName", "lastName"],
            },
        })
        .lean();

    return user?.classrooms as ClassroomType[];
};

export const getClassroomData = async (id: string) => {
    await connectToDB();
    const classroom = await Classroom.findById(id)
        .populate(["teacher", "students"])
        .lean();

    return classroom;
};

export const createClassroom = async (formData: FormData) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id).select([
            "classrooms",
        ]);
        if (!user || !session) throw new Error("Please login first!");

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
            roomId: classroom._id,
        };
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};

export const joinClassroom = async (formData: FormData) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id).select([
            "classrooms",
        ]);
        if (!user || !session) throw new Error("Please login first!");

        const inputCode = formData.get("classCode") as string;

        const classrooms = await Classroom.find().select(["_id"]);

        for (const classroom of classrooms) {
            const classCode = classroom._id.toString().slice(-5);

            if (classCode === inputCode) {
                const targetClassroom = await Classroom.findById(
                    classroom._id
                ).select(["students"]);

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
                        roomId: classroom._id,
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
