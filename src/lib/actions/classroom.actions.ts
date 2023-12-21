"use server";
import { getServerSession } from "next-auth";
import Classroom, { ClassroomType } from "../models/classroom.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

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
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id).select(["classrooms"]);

    if (user && session?.user) {
        const classroom: ClassroomType = await Classroom.create({
            subject: formData.get("subject"),
            section: formData.get("section"),
            teacher: session?.user.id,
        });

        user.classrooms.push(classroom._id);
        await user.save();

        revalidatePath("/dashboard");
    }
};
