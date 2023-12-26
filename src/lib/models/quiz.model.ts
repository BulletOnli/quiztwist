import mongoose, { Model, models } from "mongoose";

//todo in the future
// Deadline

const QuizSchema = new mongoose.Schema({
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
            required: true,
        },
    ],
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
});

export type QuizSchemaType = mongoose.InferSchemaType<typeof QuizSchema> & {
    _id: mongoose.Types.ObjectId;
};

const Quiz: Model<QuizSchemaType> =
    models.Quiz || mongoose.model("Quiz", QuizSchema);

export default Quiz;
