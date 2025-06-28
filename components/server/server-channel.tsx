"use client";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash2, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ActionToolTip from "../action-tool";

interface IServerChannel {
  role?: MemberRole;
  server: Server;
  channel: Channel;
}

const iconMap = {
  [ChannelType.AUDIO]: Mic,
  [ChannelType.TEXT]: Hash,
  [ChannelType.VIDEO]: Video,
};
const ServerChannel = ({ role, server, channel }: IServerChannel) => {
  const params = useParams();
  const router = useRouter();
  const Icon = iconMap[channel.type];
  return (
    <button
      onClick={() => {
        console.log(params);
      }}
      className={cn(
        "group w-full rounded-md flex items-center px-2 py-2 gap-x-2 transition mb-1 hover:bg-zinc-700/20 dark:hover:bg-zinc-700/70",
        channel.id === params?.channelId && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-300" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 transition dark:group-hover:text-zinc-300 ",
          channel.id === params?.channelId &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white "
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== "GUEST" && (
        <div className="flex ml-auto items-center gap-x-2">
          <ActionToolTip label="Edit" side="bottom">
            <Edit className="hidden group-hover:block h-4 w-4 transition text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 " />
          </ActionToolTip>
          <ActionToolTip label="Delete" side="bottom">
            <Trash2 className="hidden group-hover:block h-4 w-4 transition text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 " />
          </ActionToolTip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="h-4 w-4 text-zinc-500 ml-auto  dark:text-zinc-300" />
      )}
    </button>
  );
};

export default ServerChannel;
