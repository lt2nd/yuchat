import { auth } from "@/auth";
import { prisma } from "@/db";
import { redirect } from "next/navigation";


export const currentProfile = async () => {
    const session = await auth();

    if(!session) {
        return redirect('/login');
    }

    const profile = await prisma.profile.findUnique({ where: { email: session?.user?.email as string } })
    //const userId = profile.userId;

    return profile;
}