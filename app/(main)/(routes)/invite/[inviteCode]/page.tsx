import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { log } from "console";
import { redirect } from "next/navigation";
import React from "react";

interface IInviteCodePage {
  params: { inviteCode: string };
}

const InviteCodePage = async ({ params }: IInviteCodePage) => {
  const profile = await currentProfile();
  if (!profile) {
    return <RedirectToSignIn />;
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
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

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  console.log("📭:::", params);
  return <div>InviteCode</div>;
};

export default InviteCodePage;
