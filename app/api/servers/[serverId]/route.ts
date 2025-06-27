import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    console.log("PAAATCH :::: ");

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("no server id --- ", { status: 400 });
    }
    const { imageUrl, name } = await req.json();

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("ERROR to patch new link ::: ", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
export async function DELETE(
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

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("ERROR to patch new link ::: ", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
