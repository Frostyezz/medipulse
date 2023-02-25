import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/services/graphql/schemas/user.schema";
import { LANGUAGES, ROLES } from "@/common/utils/enums";

const initialState: Omit<User, "password"> = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  languagePref: LANGUAGES.EN,
  registerStep: 0,
  role: ROLES.NONE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_DATA: (state, action: PayloadAction<Partial<User>>) => ({
      ...state,
      ...action.payload,
    }),
    RESET_USER_DATA: () => initialState,
  },
});

export const { SET_USER_DATA, RESET_USER_DATA } = userSlice.actions;

export default userSlice;
