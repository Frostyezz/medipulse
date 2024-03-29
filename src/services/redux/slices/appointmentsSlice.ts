import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import {
  APPOINTMENT_IMPORTANCE,
  APPOINTMENT_STATUS,
} from "@/services/graphql/types/enums";
import { importanceColorMap } from "@/common/components/AppointmentCalendar/utils/colors";

export type AppoitmentType = Partial<
  Appointment & { [x: string | number | symbol]: unknown }
>;

const initialState: AppoitmentType[] = [];

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    SET_APPOINTMENTS: (_, action: PayloadAction<AppoitmentType[]>) =>
      action.payload,
    ADD_APPOINTMENTS: (state, action: PayloadAction<AppoitmentType[]>) => [
      ...state,
      ...action.payload,
    ],
    ADD_APPOINTMENT: (state, action: PayloadAction<AppoitmentType>) => [
      ...state,
      action.payload,
    ],
    UPDATE_APPOINTMENT: (state, action: PayloadAction<AppoitmentType>) => {
      if (action.payload.status === APPOINTMENT_STATUS.REJECTED) {
        return state.filter((item) => item._id !== action.payload._id);
      }
      const idx = state.findIndex(({ _id }) => _id === action.payload._id);
      state[idx] = {
        ...state[idx],
        ...action.payload,
        backgroundColor:
          action.payload.status !== state[idx].status ||
          action.payload.importance !== state[idx].importance
            ? importanceColorMap[
                action.payload.importance ?? APPOINTMENT_IMPORTANCE.NORMAL
              ]
            : state[idx].backgroundColor,
      };
    },
    REMOVE_APPOINTMENT: (state, action: PayloadAction<Appointment["_id"]>) =>
      state.filter(({ _id }) => _id !== action.payload),
    RESET_APPOINTMENTS: () => initialState,
  },
});

export const {
  SET_APPOINTMENTS,
  ADD_APPOINTMENTS,
  ADD_APPOINTMENT,
  RESET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
  REMOVE_APPOINTMENT,
} = appointmentSlice.actions;

export default appointmentSlice;
