import { configureStore } from "@reduxjs/toolkit";
import inviteSlice from "./slices/invitesSlice";
import patientsSlice from "./slices/patientsSlice";
import profileSlice from "./slices/profileSlice";
import transferRequestsSlice from "./slices/transferRequests";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
    [inviteSlice.name]: inviteSlice.reducer,
    [patientsSlice.name]: patientsSlice.reducer,
    [transferRequestsSlice.name]: transferRequestsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
