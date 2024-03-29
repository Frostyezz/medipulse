import AppointmentResolver from "./appointment.resolver";
import ChatResolver from "./chat.resolver";
import InviteResolver from "./invite.resolver";
import ProfileResolver from "./profile.resolver";
import TransferRequestsResolver from "./transferRequest.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [
  UserResolver,
  ProfileResolver,
  InviteResolver,
  TransferRequestsResolver,
  AppointmentResolver,
  ChatResolver,
] as const;
