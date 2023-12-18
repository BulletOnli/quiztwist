import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    firstName: String,
    lastName: String,
    profilePic: String,
    role: {
        type: String,
        default: "Guest",
    },
    classrooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classroom",
        },
    ],
});

export type UserType = mongoose.InferSchemaType<typeof UserSchema>;

const User = models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
