import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/services/graphql/schemas/profile.schema";

const initialState: {
  fetchedPatients: Partial<Profile>[];
  patients: Partial<Profile>[];
  filter: { name: string };
} = { fetchedPatients: [], patients: [], filter: { name: "" } };

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    SET_PATIENTS: (_, action: PayloadAction<Partial<Profile>[]>) => ({
      fetchedPatients: action.payload,
      patients: action.payload,
      filter: { name: "" },
    }),
    FILTER_PATIENTS: (state, action: PayloadAction<string>) => {
      state.filter.name = action.payload;

      if (action.payload) {
        state.patients = state.fetchedPatients.filter((patient) =>
          [patient.firstName, patient.lastName]
            .join("")
            .includes(action.payload)
        );
        return;
      }

      state.patients = state.fetchedPatients;
    },
    RESET_PATIENT: () => initialState,
  },
});

export const { SET_PATIENTS, FILTER_PATIENTS, RESET_PATIENT } =
  patientsSlice.actions;

export default patientsSlice;
