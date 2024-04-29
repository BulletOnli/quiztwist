import mongoose, { Model } from "mongoose";
import { ClassroomType } from "./classroom.model";
import { UserType } from "./user.model";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  customId: String,
});

const announcementSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    files: [fileSchema],
  },
  {
    timestamps: true,
  }
);

export type AnnouncementType = mongoose.InferSchemaType<
  typeof announcementSchema
> & {
  _id: mongoose.Types.ObjectId;
  room: ClassroomType;
  author: UserType;
};

const AnnouncementSchema: Model<AnnouncementType> =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default AnnouncementSchema;
