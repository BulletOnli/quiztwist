import mongoose, { Model, models } from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please provide a Question!"],
    },
    answer: {
        type: String,
        required: [true, "Please provide the answer key!"],
    },
    choices: {
        type: [String],
        validate: {
            validator: function (arr: string[]) {
                return arr.length <= 2;
            },
            message: `Choices must be at least 2.`,
        },
        required: [true, "Please provide a choices!"],
        default: [],
    },
});

export type QuestionType = mongoose.InferSchemaType<typeof questionSchema> & {
    _id: mongoose.Schema.Types.ObjectId;
};

const Question: Model<QuestionType> =
    models.Question || mongoose.model("Question", questionSchema);

export default Question;
