import { configureStore } from "@reduxjs/toolkit";
import inviteSlice from "./slices/invitesSlice";
import patientsSlice from "./slices/patientsSlice";
import profileSlice from "./slices/profileSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
    [inviteSlice.name]: inviteSlice.reducer,
    [patientsSlice.name]: patientsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
