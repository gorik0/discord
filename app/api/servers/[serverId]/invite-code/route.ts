import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserProfile } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("no server id --- ", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("ERROR to patch new link ::: ", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
