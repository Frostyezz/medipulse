import MedicResolver from "./profile.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [UserResolver, MedicResolver] as const;
