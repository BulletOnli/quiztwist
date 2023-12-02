"use server";

import User, { UserType } from "../models/user.model";
import connectToDB from "../mongoose";

export const getUser = async (id: string) => {
    try {
        await connectToDB();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
    }
};
