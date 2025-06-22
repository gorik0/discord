"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Copy,
  Loader,
  RefreshCw,
  ShieldAlert,
  ShieldBanIcon,
} from "lucide-react";
import { useOrigin } from "./use-origin";
import { useState } from "react";
import axios from "axios";
import { ServerWithMembersProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldBanIcon className="h-4 w-4 ml-3 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-3 text-rose-500" />,
};

const MemebersModal = () => {
  const origin = useOrigin();
  const { type, onClose, isOpen, data, onOpen } = useModal();

  const { server } = data as { server: ServerWithMembersProfiles };
  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white overflow-hidden">
        <DialogHeader className="">
          <DialogTitle className="text-center text-bold text-2xl">
            Members Mangm
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members.length} Memebers
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((m) => (
            <div className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={m.profile.imageURL} />
              <div className="flex flex-col gap-y-2">
                <div className="text-xs font-semibold flex items-center">
                  {m.profile.name}
                  {roleIconMap[m.role]}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MemebersModal;
