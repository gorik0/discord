"use client";
import qs from "query-string";
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
  Check,
  Copy,
  Gavel,
  Loader,
  Loader2,
  MoreVertical,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldBanIcon,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useOrigin } from "./use-origin";
import { useState } from "react";
import axios from "axios";
import { ServerWithMembersProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import { Fontdiner_Swanky, Questrial } from "next/font/google";
import { useRouter } from "next/navigation";
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldBanIcon className="h-4 w-4 ml-3 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-3 text-rose-500" />,
};

const MemebersModal = () => {
  const origin = useOrigin();
  const router = useRouter();
  const { type, onClose, isOpen, data, onOpen } = useModal();
  const [loadingID, setLoadingID] = useState("");
  const { server } = data as { server: ServerWithMembersProfiles };
  const isModalOpen = isOpen && type === "members";

  const onROleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingID(memberId);

      const query = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const respo = await axios.patch(query, { role });
      router.refresh();
      onOpen("members", { server: respo.data });
    } catch (error) {
      console.log("Error while change role ::: ", error);
    } finally {
      setLoadingID("");
    }
  };
  const onKick = async (memberId: string) => {
    try {
      setLoadingID(memberId);

      const query = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const respo = await axios.delete(query);
      router.refresh();
      onOpen("members", { server: respo.data });
    } catch (error) {
      console.log("Error while change role ::: ", error);
    } finally {
      setLoadingID("");
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white overflow-hidden">
        <DialogHeader className="">
          <DialogTitle className="text-center text-bold text-2xl">
            Members Mangm
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Memebers
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
                <p className="text-zinc-500 text-xs">{m.profile.email}</p>
              </div>
              {server.profileId != m.profileId && loadingID != m.profileId && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="w-4 h-4 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <ShieldQuestion className="w-4 h-4 mr-2" />
                          <span>ROLE</span>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onROleChange(m.id, "GUEST")}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {m.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => onROleChange(m.id, "MODERATOR")}
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderator
                                {m.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => onROleChange(m.id, "ADMIN")}
                              >
                                <ShieldBanIcon className="h-4 w-4 mr-2" />
                                Admin
                                {m.role === "ADMIN" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSubTrigger>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onKick(m.id)}>
                        <Gavel className="h-4 w-4 mr-2" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {loadingID === m.id && (
                <Loader2 className="animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MemebersModal;
