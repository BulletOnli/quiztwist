import mongoose, { Model } from "mongoose";
import { ClassroomType } from "./classroom.model";
import { UserType } from "./user.model";

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
