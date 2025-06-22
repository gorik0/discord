import NavigationSideBar from "@/components/navigation/navigation-side";
import React, { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className=" bg-amber-600 hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSideBar />
      </div>

      <main className="md:pl-[72px] pl-0 h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
