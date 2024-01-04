import mongoose, { Model, models } from "mongoose";
import { QuestionType } from "./question.model";

//todo in the future
// Deadline

const QuizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a Quiz title!"],
        },
        description: {
            type: String,
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classroom",
            required: true,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        respondents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export type QuizSchemaType = mongoose.InferSchemaType<typeof QuizSchema> & {
    _id: mongoose.Types.ObjectId;
    questions: QuestionType[];
};

const Quiz: Model<QuizSchemaType> =
    models.Quiz || mongoose.model("Quiz", QuizSchema);

export default Quiz;
