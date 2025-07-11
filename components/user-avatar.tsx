import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface IUserAvatar {
  src?: string;
  className?: string;
}

const UserAvatar = ({ src, className }: IUserAvatar) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10 ", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
