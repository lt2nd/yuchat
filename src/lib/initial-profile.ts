import { auth } from "@/auth";
import { prisma } from "@/db"
import { redirect } from "next/navigation";



export const initialProfile = async () => {

    const session = await auth();

    const profile = await prisma.profile.findFirstOrThrow({ where: { email: session?.user?.email as string } })

    if (!profile) {
        redirect('/login');
    }

    if(profile) {
        return profile;
    }
}