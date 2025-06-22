import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";

interface IServerSideBar {
  serverId: string;
}
const ServerSideBar = async ({ serverId }: IServerSideBar) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (ch) => ch.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (ch) => ch.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (ch) => ch.type === ChannelType.VIDEO
  );

  const members = server?.members.filter((m) => m.profileId !== profile.id);
  const role = server?.members.find((m) => m.profileId === profile.id)?.role;
  if (!server) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col h-full w-full dark:bg-slate-600 bg-[#fcffdd] text-primary">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSideBar;
