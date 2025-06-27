import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { NextResponse } from "next/server";
import { id } from "zod/v4/locales";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverID = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!serverID) {
      return new NextResponse("BAD request, no server ID --- ", {
        status: 400,
      });
    }

    const server = await db.server.update({
      where: {
        id: serverID,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("ERROR ::: ", error);
    return new NextResponse("Internal", { status: 500 });
  }
}
