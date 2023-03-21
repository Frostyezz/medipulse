import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";

type AppoitmentType = Partial<
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
      const idx = state.findIndex(({ _id }) => _id === action.payload._id);
      console.log(current(state[idx]), action.payload);
      state[idx] = { ...state[idx], ...action.payload };
    },
    RESET_APPOINTMENTS: () => initialState,
  },
});

export const {
  SET_APPOINTMENTS,
  ADD_APPOINTMENTS,
  ADD_APPOINTMENT,
  RESET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
} = appointmentSlice.actions;

export default appointmentSlice;
