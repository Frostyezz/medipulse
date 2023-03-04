import ProfileResolver from "./profile.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [UserResolver, ProfileResolver] as const;
