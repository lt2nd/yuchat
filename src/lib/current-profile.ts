import { auth } from "@/auth";
import { prisma } from "@/db";


export const currentProfile = async () => {
    const session = await auth();

    if(!session) {
        return null;
    }

    const profile = await prisma.profile.findUnique({ where: { email: session?.user?.email as string } })
    //const userId = profile.userId;

    return profile;
}