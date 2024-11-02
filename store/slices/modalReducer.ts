/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  spinner: { isShow: false },
  urlQuery: { isShow: false },
  successModal: {
    isShow: false,
    title: "Success",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, consequatur.",
  },
  errorModal: {
    isShow: false,
    title: "Error",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, consequatur.",
  },
};

// Create a slice for modal and spinner state
const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showSpinner(state, action: PayloadAction<boolean>) {
      state.spinner.isShow = action.payload;
    },
    showUrlEntry(state, action: PayloadAction<boolean>) {
      state.urlQuery.isShow = action.payload;
    },
    showSuccessModal(
      state,
      action: PayloadAction<{
        isShow: boolean;
        title?: string;
        description?: string;
      }>,
    ) {
      state.successModal.isShow = action.payload.isShow;
      if (action.payload.title) state.successModal.title = action.payload.title;
      if (action.payload.description)
        state.successModal.description = action.payload.description;
    },
    showErrorModal(
      state,
      action: PayloadAction<{
        isShow: boolean;
        title?: string;
        description?: string;
      }>,
    ) {
      state.errorModal.isShow = action.payload.isShow;
      if (action.payload.title) state.errorModal.title = action.payload.title;
      if (action.payload.description)
        state.errorModal.description = action.payload.description;
    },
  },
});

// Export actions for use in components
export const { showSpinner, showUrlEntry, showSuccessModal, showErrorModal } =
  modalSlice.actions;

// Export the reducer to include in the store
export default modalSlice.reducer;
