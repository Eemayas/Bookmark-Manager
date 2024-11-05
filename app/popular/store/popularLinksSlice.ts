import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PopularLinksType } from "../types";

// Initial State
interface PopularLinksState {
  data: Record<string, PopularLinksType[]>; // Dynamic categories
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PopularLinksState = {
  data: {},
  loading: false,
  error: null,
  successMessage: null,
};

// Thunks for CRUD operations

// Fetch links (all categories or a specific one)
export const fetchPopularLinks = createAsyncThunk(
  "popularLinks/fetchPopularLinks",
  async ({ category }: { category?: string }, { rejectWithValue }) => {
    try {
      const url = category
        ? `/api/poularwebsite?category=${category}`
        : `/api/poularwebsite`;
      const response = await fetch(url);
      const data = await response.json();
      return { category, data };
    } catch (error) {
      return rejectWithValue("Failed to fetch links");
    }
  },
);

// Add a new Popular link
export const createPopularLink = createAsyncThunk(
  "popularLinks/createPopularLink",
  async (
    { category, newLink }: { category: string; newLink: PopularLinksType },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`/api/poularwebsite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, newLink }),
      });
      const data = await response.json();
      return { category, newLink };
    } catch (error) {
      return rejectWithValue(`Failed to add Popular link ${error}`);
    }
  },
);

// Delete a Popular link by ID
export const deletePopularLink = createAsyncThunk(
  "popularLinks/deletePopularLink",
  async (
    { category, _id }: { category: string; _id: string },
    { rejectWithValue },
  ) => {
    try {
      await fetch(`/api/poularwebsite`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, _id }),
      });
      return { category, _id };
    } catch (error) {
      return rejectWithValue("Failed to delete Popular link");
    }
  },
);

// Update a Popular link by ID
export const updatePopularLink = createAsyncThunk(
  "popularLinks/updatePopularLink",
  async (
    {
      category,
      _id,
      updateData,
    }: { category: string; _id: string; updateData: Partial<PopularLinksType> },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`/api/poularwebsite`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, _id, updateData }),
      });
      const data = await response.json();
      return { category, _id, updateData };
    } catch (error) {
      return rejectWithValue("Failed to update Popular link");
    }
  },
);

// Slice
const popularLinksSlice = createSlice({
  name: "popularLinks",
  initialState,
  reducers: {
    clearPeronalLinksMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchLinks
      .addCase(fetchPopularLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Popular Links fetched successfully";
        if (action.payload.category) {
          state.data[action.payload.category] = action.payload.data;
        } else {
          state.data = action.payload.data;
        }
      })
      .addCase(fetchPopularLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createLink
      .addCase(createPopularLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPopularLink.fulfilled, (state, action) => {
        state.loading = false;
        const { category, newLink } = action.payload;
        state.data[category] = [...(state.data[category] || []), newLink];
        state.successMessage = "Popular Link created successfully";
      })
      .addCase(createPopularLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteLink
      .addCase(deletePopularLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePopularLink.fulfilled, (state, action) => {
        state.loading = false;
        const { category, _id } = action.payload;
        state.data[category] = state.data[category].filter(
          (link) => link._id !== _id,
        );
        state.successMessage = "Popular Link deleted successfully";
      })
      .addCase(deletePopularLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateLink
      .addCase(updatePopularLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePopularLink.fulfilled, (state, action) => {
        state.loading = false;
        const { category, _id, updateData } = action.payload;
        const index = state.data[category].findIndex(
          (link) => link._id === _id,
        );
        if (index >= 0) {
          state.data[category][index] = {
            ...state.data[category][index],
            ...updateData,
          };
        }
        state.successMessage = "Popular Link updated successfully";
      })
      .addCase(updatePopularLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { clearPeronalLinksMessages } = popularLinksSlice.actions;

export default popularLinksSlice.reducer;
