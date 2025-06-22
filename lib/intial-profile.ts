import { RedirectToSignIn, useUser } from "@clerk/nextjs";

import { db } from "./db";
import { useTransition } from "react";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
export const initialProfile = async () => {
  // DEBUG HERE

  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    return profile;
  }
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} .. ${user.lastName}`,
      imageURL: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
