import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Invite } from "@/services/graphql/schemas/invite.schema";

const initialState: Invite[] = [];

export const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    ADD_INVITES: (state, action: PayloadAction<Invite[]>) => [
      ...state,
      ...action.payload,
    ],
    ADD_INVITE: (state, action: PayloadAction<Invite>) => [
      ...state,
      action.payload,
    ],
    RESET_INVITES: () => initialState,
  },
});

export const { ADD_INVITES, ADD_INVITE, RESET_INVITES } = inviteSlice.actions;

export default inviteSlice;
