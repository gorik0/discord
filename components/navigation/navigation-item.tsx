"use client";

import React from "react";
import { string } from "zod";
import ActionToolTip from "../action-tool";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface INavigationItem {
  id: string;
  name: string;
  imageUrl: string;
}
const NavigationItem = ({ id, name, imageUrl }: INavigationItem) => {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionToolTip label={name} side="right" align="center">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all   w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[20px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            " relative group flex mx-3 w-[48px] h-[48px] rounded-[24px] hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverid === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <img
            src={imageUrl}
            alt="Channel"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
