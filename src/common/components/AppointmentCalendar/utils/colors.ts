import { APPOINTMENT_IMPORTANCE } from "@/services/graphql/types/enums";

export const importanceColorMap: Record<APPOINTMENT_IMPORTANCE, string> = {
  [APPOINTMENT_IMPORTANCE.LOW]: "#12b886",
  [APPOINTMENT_IMPORTANCE.NORMAL]: "#228be6",
  [APPOINTMENT_IMPORTANCE.URGENT]: "#fa5252",
};

export const pendingColor = "#15aabf";
