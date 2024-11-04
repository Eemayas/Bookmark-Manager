/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  spinner: { isShow: false },
  deletemodal: { isShow: false, _id: "1", section: "Personal_Website" },
  statusModal: {
    isShow: false,
    status: "success",
    title: "Success",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, consequatur.",
  },
  addWebsiteModal: {
    isShow: false,
    section: "Personal_Website",
    isEdit: false,
    data: {
      _id: "",
      name: "",
      link: "",
      tags: [""],
      folder_path: "",
      description: "",
    },
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

    showDeleteModal(
      state,
      action: PayloadAction<{
        isShow: boolean;
        _id: string;
        section: "Personal_Website" | "Popular_Links";
      }>,
    ) {
      state.deletemodal.isShow = action.payload.isShow;
      state.deletemodal._id = action.payload._id;
      state.deletemodal.section = action.payload.section;
      return state;
    },
    showStatusModal(
      state,
      action: PayloadAction<{
        isShow: boolean;
        status: "success" | "error";
        title: string;
        description?: string;
      }>,
    ) {
      state.statusModal.isShow = action.payload.isShow;
      state.statusModal.status = action.payload.status;
      state.statusModal.title = action.payload.title;
      if (action.payload.description)
        state.statusModal.description = action.payload.description;
    },
    showAddWebsiteModal(
      state,
      action: PayloadAction<{
        isShow: boolean;
        section: "Personal_Website" | "Popular_Links";
        isEdit?: boolean;
        data?: {
          _id: string;
          name: string;
          link: string;
          tags: string[];
          folder_path: string;
          description: string;
        };
      }>,
    ) {
      state.addWebsiteModal.isShow = action.payload.isShow;
      state.addWebsiteModal.section = action.payload.section;
      if (action.payload.isEdit) {
        state.addWebsiteModal.isEdit = action.payload.isEdit;
      } else {
        state.addWebsiteModal.isEdit = false;
      }
      if (action.payload.data) {
        state.addWebsiteModal.data = action.payload.data;
      } else {
        state.addWebsiteModal.data = {
          _id: "",
          name: "",
          link: "",
          tags: [],
          folder_path: "",
          description: "",
        };
      }
    },
  },
});

// Export actions for use in components
export const {
  showSpinner,
  showDeleteModal,
  showStatusModal,
  showAddWebsiteModal,
} = modalSlice.actions;

// Export the reducer to include in the store
export default modalSlice.reducer;
