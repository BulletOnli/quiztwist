"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../mongoose";

export const fetchUsers = async () => {
    connectToDB();
    const users = await User.find();

    return users;
};

export const addStudent = async () => {
    connectToDB();
    const session = await getServerSession(authOptions);

    const newStudent = await User.create({
        email: "sfdsf@gamil.com",
        username: "Mhica Shane",
        profilePic: "",
        role: "Guest",
    });

    revalidatePath("/onboarding");

    return { message: "New Student added" };
};
