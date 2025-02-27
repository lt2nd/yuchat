
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/db";


// export async function DELETE(
//   req: Request,
//   { params }: { params: { serverId: string } }
// ) {
//   try {
//     const profile = await currentProfile();

//     if (!profile) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const server = await prisma.server.delete({
//       where: {
//         id: params.serverId,
//         profileId: profile.id,
//       }
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.log("[SERVER_ID_DELETE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    //const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
        return new NextResponse("Server ID missing", { status: 400 });
    }

    const newInviteCode = uuidv4();
    console.log("New invite code generated:", newInviteCode);
    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: newInviteCode,
      },
    });
    console.log("Updated server:", server);

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

