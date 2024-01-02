import mongoose, { Model } from "mongoose";
import { UserType } from "./user.model";
import { QuizSchemaType } from "./quiz.model";

const classroomSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        section: {
            type: String,
            required: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a Teacher!"],
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        quizzes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export type ClassroomType = mongoose.InferSchemaType<typeof classroomSchema> & {
    _id: mongoose.Types.ObjectId;
    teacher: UserType;
    students: UserType[];
    quizzes: QuizSchemaType[];
};

const Classroom: Model<ClassroomType> =
    mongoose.models.Classroom || mongoose.model("Classroom", classroomSchema);

export default Classroom;
