import MedicResolver from "./medic.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [UserResolver, MedicResolver] as const;
