import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/services/graphql/schemas/user.schema";
import { LANGUAGES } from "@/services/graphql/types/enums";
import { Medic } from "@/services/graphql/schemas/medic.schema";

export type UserSliceType = Partial<
  Omit<User, "password" | "validationCode" | "isEmailVerified"> &
    Omit<Medic, "medicalProof" | "_id">
>;

const initialState: UserSliceType = {
  language: LANGUAGES.en,
  registerStep: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_DATA: (state, action: PayloadAction<UserSliceType>) => ({
      ...state,
      ...action.payload,
    }),
    RESET_USER_DATA: () => initialState,
  },
});

export const { SET_USER_DATA, RESET_USER_DATA } = userSlice.actions;

export default userSlice;
