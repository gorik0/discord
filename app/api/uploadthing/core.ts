// core.ts
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// 🔐 Middleware for Clerk auth
const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId }; // This becomes metadata you can access later
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("✅ Upload complete for user:", metadata.userId);
      console.log("📦 File URL:", file.url);
    }),

  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("📥 Message file uploaded by:", metadata.userId);
      console.log("🔗 File info:", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
