import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  GetTransfersRequestsResult,
  TransferRequest,
} from "@/services/graphql/schemas/transferRequest.schema";

const initialState: GetTransfersRequestsResult[] = [];

export const transferRequestsSlice = createSlice({
  name: "transferRequests",
  initialState,
  reducers: {
    SET_TRANSFER_REQUESTS: (
      _,
      action: PayloadAction<GetTransfersRequestsResult[]>
    ) => action.payload,
    REMOVE_TRANSFER_REQUEST: (
      state,
      action: PayloadAction<TransferRequest["_id"]>
    ) => state.filter(({ request }) => request._id !== action.payload),
    RESET_TRANSFER_REQUESTS: () => initialState,
  },
});

export const {
  SET_TRANSFER_REQUESTS,
  REMOVE_TRANSFER_REQUEST,
  RESET_TRANSFER_REQUESTS,
} = transferRequestsSlice.actions;

export default transferRequestsSlice;
