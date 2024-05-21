import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 3 },
    pdf: { maxFileSize: "16MB", maxFileCount: 3 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload success");
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
