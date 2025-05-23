


import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/db";


interface ServerIdPageProps {
  params: {
    serverId: string;
  }
};

const ServerIdPage = async ({
  params
}: ServerIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/login");
  }

  const server = await prisma.server.findUnique({
    where: {
      id: (await params).serverId,
      members: {
        some: {
          profileId: profile.id,
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          created_at: "asc"
        }
      }
    }
  })

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${(await params).serverId}/channels/${initialChannel?.id}`)
}
 
export default ServerIdPage;