import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/services/graphql/schemas/profile.schema";

export type ProfileSliceType = Partial<Omit<Profile, "medicalProof">>;

const initialState: ProfileSliceType = {};

export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    SET_PROFILE_DATA: (state, action: PayloadAction<ProfileSliceType>) => ({
      ...state,
      ...action.payload,
    }),
    RESET_PROFILE_DATA: () => initialState,
  },
});

export const { SET_PROFILE_DATA, RESET_PROFILE_DATA } = profileSlice.actions;

export default profileSlice;
