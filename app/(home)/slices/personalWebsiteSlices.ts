import { PersonalWebsiteType } from "@/app/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface WebsiteState {
  websites: PersonalWebsiteType[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: WebsiteState = {
  websites: [],
  loading: false,
  error: null,
  successMessage: null,
};
// Async Thunks for CRUD operations

export const createPersonalWebsite = createAsyncThunk(
  "personalWebsite/createPersonalWebsite",
  async (website: PersonalWebsiteType, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(website),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create website");
      return data.website;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPersonalWebsites = createAsyncThunk(
  "personalWebsite/getPersonalWebsites",
  async (email_address: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/website?email_address=${email_address}`,
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch websites");
      return data.websites;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updatePersonalWebsite = createAsyncThunk(
  "personalWebsite/updatePersonalWebsite",
  async (website: PersonalWebsiteType, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/website", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(website),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to update website");
      return data.website;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deletePersonalWebsite = createAsyncThunk(
  "personalWebsite/deletePersonalWebsite",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/website", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to delete website");
      return _id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
// Slice
const personalWebsiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPersonalWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPersonalWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.websites.push(action.payload);
        state.successMessage = "Website created successfully";
      })
      .addCase(createPersonalWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPersonalWebsites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPersonalWebsites.fulfilled, (state, action) => {
        state.loading = false;
        state.websites = action.payload;
      })
      .addCase(getPersonalWebsites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePersonalWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonalWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.websites = state.websites.map((website) =>
          website._id === action.payload._id ? action.payload : website,
        );
        state.successMessage = "Website updated successfully";
      })
      .addCase(updatePersonalWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePersonalWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePersonalWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.websites = state.websites.filter(
          (website) => website._id !== action.payload,
        );
        state.successMessage = "Website deleted successfully";
      })
      .addCase(deletePersonalWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = personalWebsiteSlice.actions;
export default personalWebsiteSlice.reducer;
