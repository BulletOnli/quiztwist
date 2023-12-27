"use server";

import { getServerSession } from "next-auth";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getErrorMessage } from "../utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const onboardingAction = async (formData: FormData) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("Please sign in first!");

        await connectToDB();
        // Check if the user exist in the database
        const user = await User.findOne({
            email: session.user.email,
        });
        if (!user) throw new Error("User not found");

        const formDataSchema = z.object({
            firstName: z
                .string()
                .min(3, "First name must be at least 3 characters"),
            lastName: z
                .string()
                .min(3, "Last name must be at least 3 characters"),
            role: z.string(),
        });

        // Validate the form
        const result = formDataSchema.safeParse(Object.fromEntries(formData));
        if (!result.success) throw new Error(result.error.errors[0].message);

        // Update the user's information in the database
        user.firstName = result.data.firstName;
        user.lastName = result.data.lastName;
        user.role = result.data.role;
        await user.save();
    } catch (error) {
        return {
            error: getErrorMessage(error),
        };
    }

    redirect("/dashboard");
};
