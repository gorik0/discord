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
import { Copy, Loader, RefreshCw } from "lucide-react";
import { useOrigin } from "./use-origin";
import { useState } from "react";
import axios from "axios";

const InviteModal = () => {
  const origin = useOrigin();
  const { type, onClose, isOpen, data, onOpen } = useModal();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = () => {
    setCopied(true);

    navigator.clipboard.writeText(inviteUrl);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNewLink = async () => {
    try {
      setLoading(true);
      const resp = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: resp.data });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const { server } = data;
  const isModalOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white overflow-hidden">
        <DialogHeader className="">
          <DialogTitle className="text-center text-bold text-2xl">
            CUSTOMIZE server
          </DialogTitle>
        </DialogHeader>
        <div className="px-3">
          <Label className="uppercase text-xs text-zinc-500 dark:text-secondary/70 font-bold">
            Server Invite link
          </Label>

          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0 "
              value={inviteUrl}
            />
            <Button disabled={loading} size={"icon"} onClick={onCopy}>
              {copied ? (
                <Loader className="w-4 h-4 " />
              ) : (
                <Copy className="w-4 h-4 " />
              )}
            </Button>
          </div>
          <Button
            disabled={loading}
            size={"sm"}
            onClick={onNewLink}
            variant={"link"}
            className="text-zinc-500 text-xs mt-4"
          >
            generate new link
            <RefreshCw className="h-4 w-4 mr-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
