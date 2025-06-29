"use client";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldEllipsis } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import UserAvatar from "../user-avatar";

interface IServerMember {
  member: Member & { profile: Profile };
  server: Server;
}

const iconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className="ml-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldEllipsis className="ml-2 h-4 w-4 text-indigo-500" />
  ),
};

const ServerMember = ({ member, server }: IServerMember) => {
  const params = useParams();
  const router = useRouter();
  const Icon = iconMap[member.role];
  return (
    <button
      className={cn(
        "group rounded-md w-full flex items-center px-2 py-2 gap-x-2 transition mb-1 hover:bg-zinc-700/20 dark:hover:bg-zinc-700/70",
        member.id === params?.memberId && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar src={member.profile.imageURL} className="h-8 w-8" />
      <p
        className={cn(
          "text-left font-semibold text-sm text-zinc-500  group-hover:text-zinc-700 dark:text-zinc-400 transition dark:group-hover:text-zinc-300 ",
          member.id === params?.memberId &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white "
        )}
      >
        {member.profile.name}
      </p>
      {Icon}
    </button>
  );
};

export default ServerMember;
