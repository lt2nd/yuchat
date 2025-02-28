import { prisma } from "@/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

interface InvitePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InvitePage = async ({ params }: InvitePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/login");
  }

  if (!(await params).inviteCode) {
    return redirect("/");
  }

  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: (await params).inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await prisma.server.update({
    where: {
      inviteCode: (await params).inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InvitePage;