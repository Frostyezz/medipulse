import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "@/services/graphql/schemas/chat.schema";

const initialState: Partial<Chat> = {};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    SET_CHAT: (_, action: PayloadAction<Partial<Chat>>) => action.payload,
    ADD_MESSAGE: (state, action: PayloadAction<Message>) => ({
      ...state,
      messages: [...(state.messages ?? []), action.payload],
    }),
    RESET_CHAT: () => initialState,
  },
});

export const { SET_CHAT, ADD_MESSAGE, RESET_CHAT } = chatSlice.actions;

export default chatSlice;
