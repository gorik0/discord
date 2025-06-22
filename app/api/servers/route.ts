import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuid4 } from "uuid";
export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newServer = await db.server.create({
      data: {
        profileId: profile.id,
        imageUrl,
        name,
        inviteCode: uuid4(),
        channels: {
          create: [{ profileId: profile.id, name: "general" }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(newServer);
  } catch (error) {
    console.log("ERROR ::: ", error);
    return new NextResponse("Internal", { status: 500 });
  }
}
