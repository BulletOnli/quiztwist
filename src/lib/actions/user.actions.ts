"use server";

import { getServerSession } from "next-auth";
import User from "../models/user.model";
import connectToDB from "../mongoose";

export const onboardingAction = async (formData: FormData) => {
    const session = await getServerSession();
    if (!session) return;

    await connectToDB();

    const data = Object.fromEntries(formData) as {
        firstName: string;
        lastName: string;
        role: string;
    };

    const user = await User.findOne({
        email: session?.user.email,
    });

    if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.role = data.role;

        await user.save();
    }
};
