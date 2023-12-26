"use server";
import { getServerSession } from "next-auth";
import Classroom, { ClassroomType } from "../models/classroom.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { getErrorMessage } from "../utils";

export const getClassrooms = async () => {
    await connectToDB();
    const session = await getServerSession(authOptions);

    const user = await User.findById(session?.user.id)
        .select(["classrooms"])
        .populate("classrooms");

    if (user) {
        return user.classrooms as ClassroomType[];
    }
};

export const getClassroomData = async (id: string) => {
    await connectToDB();

    const classroom = await Classroom.findById(id).populate([
        "teacher",
        "students",
    ]);

    if (classroom) {
        return classroom;
    } else {
        console.log("No classroom found");
    }
};

export const createClassroom = async (formData: FormData) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const user = await User.findById(session?.user.id).select([
            "classrooms",
        ]);
        if (!user || !session) throw new Error("Please login first!");

        const classroom: ClassroomType = await Classroom.create({
            subject: formData.get("subject"),
            section: formData.get("section"),
            teacher: session?.user.id,
        });

        user.classrooms.push(classroom._id);
        await user.save();

        revalidatePath("/dashboard");
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
        const user = await User.findById(session?.user.id);
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

                targetClassroom.students.push(user._id);
                await targetClassroom.save();

                user.classrooms.push(targetClassroom._id);
                await user.save();

                revalidatePath("/s/dashboard");

                return;
            }
        }

        console.log("Invlaid code");
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }
};
