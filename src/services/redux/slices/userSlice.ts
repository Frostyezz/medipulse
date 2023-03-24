import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/services/graphql/schemas/user.schema";
import { LANGUAGES, THEME } from "@/services/graphql/types/enums";

export type UserSliceType = Partial<
  Omit<User, "password" | "validationCode" | "isEmailVerified">
>;

const initialState: UserSliceType = {
  language: LANGUAGES.en,
  registerStep: 0,
  theme: THEME.light,
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
