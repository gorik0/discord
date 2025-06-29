"use client";
import { ServerWithMembersProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import React from "react";
import ActionToolTip from "../action-tool";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface IServerSection {
  label: string;
  role?: MemberRole;
  type?: ChannelType;
  server?: ServerWithMembersProfiles;
  content: "channels" | "members";
}
const ServerSection = ({
  label,
  role,
  type,
  server,
  content,
}: IServerSection) => {
  const { onOpen } = useModal();

  return (
    <div className="flex justify-between items-center py-2">
      <p className="font-semibold text-xs text-zinc-600 dark:text-zinc-400 uppercase">
        {label}
      </p>
      {role !== "GUEST" && content === "channels" && (
        <ActionToolTip label="Create Channel " side="top">
          <button
            onClick={() => onOpen("channelCreate", { channelType: type })}
            className="transition text-zinc-300 hover:text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionToolTip>
      )}
      {role === "ADMIN" && content === "members" && (
        <ActionToolTip label="Members settings " side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="transition text-zinc-300 hover:text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-100"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionToolTip>
      )}
    </div>
  );
};

export default ServerSection;
