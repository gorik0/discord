import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
