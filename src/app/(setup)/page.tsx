//import { auth } from "@/auth";
import { InitialModal } from "@/components/modals/initial-modal";
import { prisma } from "@/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {

    //const session = await auth();

    const profile = await initialProfile();

    const server = await prisma.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal />;
}

export default SetupPage; 