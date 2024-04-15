"use server";

import { getServerSession } from "next-auth";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import { redirect } from "next/navigation";
import { z } from "zod";
import getErrorMessage from "@/utils/getErrorMessage";
import authOptions from "@/utils/authOptions";
import Classroom from "../models/classroom.model";

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
      firstName: z.string().min(3, "First name must be at least 3 characters"),
      lastName: z.string().min(3, "Last name must be at least 3 characters"),
      role: z.string(),
    });

    // Validate the form
    const result = formDataSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) throw new Error(result.error.errors[0].message);

    // Update the user's information in the database
    user.firstName = result.data.firstName;
    user.lastName = result.data.lastName;
    user.role = result.data.role;

    if (user.role.toLowerCase() === "student") {
      const classroom = await Classroom.findById("65dea0ee9cacf08fc5ecffe8");
      if (!classroom) {
        return {
          error: "Classroom not found!",
        };
      }

      classroom?.students.push(user._id);
      user.classrooms.push(classroom?._id);

      await classroom.save();
    }

    await user.save();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  redirect("/dashboard");
};
