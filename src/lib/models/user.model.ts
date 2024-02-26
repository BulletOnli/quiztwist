import mongoose, { Model, models } from "mongoose";
import { ClassroomType } from "./classroom.model";

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
  answeredQuizzes: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  subscription: {
    type: String,
    default: "Basic",
  },
});

export type UserType = mongoose.InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
  classrooms: ClassroomType[];
};

const User: Model<UserType> = models.User || mongoose.model("User", UserSchema);

export default User;
