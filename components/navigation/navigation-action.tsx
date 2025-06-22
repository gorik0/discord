"use client";
import { Plus } from "lucide-react";
import React from "react";
import ActionToolTip from "../action-tool";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionToolTip label="Add a sevrer " side="right" align="center">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="flex rounded-[24px] group-hover:rounded-[16px] h-[48px] w-[48px] mx-3 transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-600 group-hover:bg-emerald-500">
            <Plus className="group-hover:text-white transition text-emerald-500" />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};

export default NavigationAction;
