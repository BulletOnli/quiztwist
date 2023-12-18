import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    subject: {
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
});

export type ClassroomType = mongoose.InferSchemaType<typeof classroomSchema>;

const Classroom =
    mongoose.models.Classroom || mongoose.model("Classroom", classroomSchema);

export default Classroom;
