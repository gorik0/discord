"use client";
import { currentProfile } from "@/lib/current-profile";
import { ServerWithMembersProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface IServerHeader {
  server: ServerWithMembersProfiles;
  role?: MemberRole;
}
const ServerHeader = ({ server, role }: IServerHeader) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
        {server.name}
        <ChevronDown className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-500 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-indigo-400 dark:text-indigo-800 cursor-pointer text-sm p-3"
          >
            INVIte people
            <UserPlus className="ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className=" cursor-pointer text-sm p-3"
          >
            Settings
            <Settings className="ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className=" cursor-pointer text-sm p-3"
          >
            Manage members
            <Users className="ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("channelCreate")}
            className=" cursor-pointer text-sm p-3"
          >
            CreateChannel
            <PlusCircle className="ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className=" cursor-pointer text-sm p-3">
            CreateChannel
            <PlusCircle className="ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 hover:bg-rose-700/10  cursor-pointer text-sm p-3">
            Delete server
            <Trash className="text-rose-500 ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="text-rose-500 hover:bg-rose-700/10  cursor-pointer text-sm p-3"
          >
            Leave server
            <LogOut className="text-rose-500 ml-auto h-4 w-4 " />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
