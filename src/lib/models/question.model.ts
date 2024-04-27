import mongoose, { Model, models } from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide a Question!"],
  },
  rightAnswer: {
    type: String,
    required: [true, "Please provide the answer key!"],
    validate: {
      validator: function (value: string) {
        return value.length <= 1; // For example, requiring at least 5 characters
      },
      message: "Answer must be a single character!",
    },
  },
  choices: {
    type: [String],
    required: [true, "Please provide a choices!"],
    default: [],
  },
});

export type QuestionType = mongoose.InferSchemaType<typeof questionSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Question: Model<QuestionType> =
  models?.Question || mongoose.model("Question", questionSchema);

export default Question;
