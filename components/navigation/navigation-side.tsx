import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Edu_SA_Beginner } from "next/font/google";
import { redirect } from "next/navigation";

import React from "react";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../toggle-mode";
import { UserButton } from "@clerk/nextjs";

const NavigationSideBar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="bg-amber-600 flex flex-col items-center w-full text-primary h-full space-y-4">
      Navigation SideBar
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
      <ScrollArea className="flex-1 w-full overflow-y-auto">
        {servers.map((s) => (
          <div key={s.id} className="mb-4">
            <NavigationItem id={s.id} imageUrl={s.imageUrl} name={s.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-col items-center gap-y-4 pb-10 mt-auto">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSideBar;
