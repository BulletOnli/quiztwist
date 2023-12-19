"use server";

import { getServerSession } from "next-auth";
import Classroom, { ClassroomType } from "../models/classroom.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../mongoose";
import { revalidatePath } from "next/cache";

export const getAllClassrooms = async () => {
    await connectToDB();
    const session = await getServerSession(authOptions);

    const classrooms = await Classroom.find({
        teacher: session?.user.id,
    }).populate([]);

    return classrooms as ClassroomType[];
};

export const createClassroom = async (formData: FormData) => {
    await connectToDB();
    const session = await getServerSession(authOptions);

    await Classroom.create({
        subject: formData.get("subject"),
        section: formData.get("section"),
        teacher: session?.user.id,
    });

    revalidatePath("/dashboard");
};
