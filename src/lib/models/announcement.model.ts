import mongoose from "mongoose";

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
};

const AnnouncementSchema =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default AnnouncementSchema;
