import { auth } from "@/auth";
import { prisma } from "@/db"
import { redirect } from "next/navigation";



export const initialProfile = async () => {

    const session = await auth();

    if(!session){
        return redirect('/login');
    }

    const profile = await prisma.profile.findFirstOrThrow({ where: { email: session?.user?.email as string } })

    if(profile) {
        return profile;
    }

    const newProfile = await prisma.profile.create({
        data: {
            username: session?.user?.name,
            avatar: session?.user?.image,
            email: session?.user?.email ?? '',
        }
    });

    return newProfile;
}