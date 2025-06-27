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
import { isCustomErrorPage } from "next/dist/build/utils";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";

const LeaveServerModal = () => {
  const router = useRouter();
  const { type, onClose, isOpen, data, onOpen } = useModal();
  const [loading, setLoading] = useState(false);

  const { server } = data;
  const isModalOpen = isOpen && type === "leaveServer";

  const onClick = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("🎹🎹🎹🎹🎹🎹", loading);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white overflow-hidden">
        <DialogHeader className="">
          <DialogTitle className="text-center text-bold text-2xl">
            Leave server
          </DialogTitle>
          <DialogDescription className="text-center font-bold text-2xl">
            Are us sure u wana leave :::
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-10 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={() => {}} variant={"primary"}>
              Cancel
            </Button>
            <Button disabled={loading} onClick={onClick} variant={"ghost"}>
              Accept
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
