import InviteResolver from "./invite.resolver";
import ProfileResolver from "./profile.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [
  UserResolver,
  ProfileResolver,
  InviteResolver,
] as const;
