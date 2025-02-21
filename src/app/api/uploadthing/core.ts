

import { createUploadthing, type FileRouter } from "uploadthing/next";
//import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { prisma } from "@/db";

const f = createUploadthing();

const handleAuth = async () => {
    const session = await auth();

    if (!session) throw new Error('Unauthorized');

    const profile = await prisma.profile.findFirstOrThrow({ where: { email: session?.user?.email as string } })
    const userId = profile.userId;
    if (!session) throw new Error('Unauthorized');
    return { userId: userId };
}

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
