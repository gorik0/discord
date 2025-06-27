import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Camera, Hash, Mic, ShieldAlert, ShieldBan } from "lucide-react";

interface IServerSideBar {
  serverId: string;
}

const iconChannels = {
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 " />,
  [ChannelType.TEXT]: <Hash className="h-4 w-4 " />,
  [ChannelType.VIDEO]: <Camera className="h-4 w-4 " />,
};

const memberIcon = {
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 " />,
  [MemberRole.MODERATOR]: <ShieldBan className="h-4 w-4 " />,
  [MemberRole.GUEST]: null,
};
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
      <ScrollArea className="flex-1 px-3">
        <div className="mt-3">
          <ServerSearch
            data={[
              {
                label: "Text channels",
                type: "channel",
                data: textChannels?.map((ch) => ({
                  icon: iconChannels[ch.type],
                  id: ch.id,
                  name: ch.name,
                })),
              },
              {
                label: "Video channels",
                type: "channel",
                data: videoChannels?.map((ch) => ({
                  icon: iconChannels[ch.type],
                  id: ch.id,
                  name: ch.name,
                })),
              },
              {
                label: "Audio channels",
                type: "channel",
                data: audioChannels?.map((ch) => ({
                  icon: iconChannels[ch.type],
                  id: ch.id,
                  name: ch.name,
                })),
              },
              {
                label: "Memembers ",
                type: "member",
                data: members?.map((m) => ({
                  icon: memberIcon[m.role],
                  id: m.id,
                  name: m.profile.name,
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
