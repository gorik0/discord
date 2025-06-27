"use client";
import { Search } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { log } from "console";

interface IServerSearch {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}
const ServerSearch = ({ data }: IServerSearch) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "i" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log("HELELOE");

        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex w-full items-center gap-x-2 transition hover:bg-zinc-500/10 dark:hover:bg-zinc-500/70  "
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className=" font-semibold text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
          {" "}
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono ml-auto text-[10px] font-medium text-muted-foreground">
          <span className="text-xs"> CMD </span> k
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="List all channels and members " />
        <CommandList>
          <CommandEmpty>No result</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, icon, name }) => (
                  <CommandItem key={id}>
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
  ``;
};

export default ServerSearch;
