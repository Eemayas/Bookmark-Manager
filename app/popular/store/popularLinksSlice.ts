import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PopularLinksType } from "../types";

// Initial State
interface PopularLinksState {
  data: Record<string, PopularLinksType[]>; // Dynamic categories
  loading: boolean;
  error: string | null;
}

const initialState: PopularLinksState = {
  data: {},
  loading: false,
  error: null,
};

// Thunks for CRUD operations

// Fetch links (all categories or a specific one)
export const fetchLinks = createAsyncThunk(
  "popularLinks/fetchLinks",
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

// Add a new link
export const addLink = createAsyncThunk(
  "popularLinks/addLink",
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
      return rejectWithValue(`Failed to add link ${error}`);
    }
  },
);

// Delete a link by ID
export const deleteLink = createAsyncThunk(
  "popularLinks/deleteLink",
  async (
    { category, id }: { category: string; id: number },
    { rejectWithValue },
  ) => {
    try {
      await fetch(`/api/poularwebsite`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, id }),
      });
      return { category, id };
    } catch (error) {
      return rejectWithValue("Failed to delete link");
    }
  },
);

// Update a link by ID
export const updateLink = createAsyncThunk(
  "popularLinks/updateLink",
  async (
    {
      category,
      id,
      updateData,
    }: { category: string; id: number; updateData: Partial<PopularLinksType> },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`/api/poularwebsite`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, id, updateData }),
      });
      const data = await response.json();
      return { category, id, updateData };
    } catch (error) {
      return rejectWithValue("Failed to update link");
    }
  },
);

// Slice
const popularLinksSlice = createSlice({
  name: "popularLinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchLinks
      .addCase(fetchLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.category) {
          state.data[action.payload.category] = action.payload.data;
        } else {
          state.data = action.payload.data;
        }
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // addLink
      .addCase(addLink.fulfilled, (state, action) => {
        const { category, newLink } = action.payload;
        state.data[category] = [...(state.data[category] || []), newLink];
      })
      // deleteLink
      .addCase(deleteLink.fulfilled, (state, action) => {
        const { category, id } = action.payload;
        state.data[category] = state.data[category].filter(
          (link) => link.id !== id,
        );
      })
      // updateLink
      .addCase(updateLink.fulfilled, (state, action) => {
        const { category, id, updateData } = action.payload;
        const index = state.data[category].findIndex((link) => link.id === id);
        if (index >= 0) {
          state.data[category][index] = {
            ...state.data[category][index],
            ...updateData,
          };
        }
      });
  },
});

export default popularLinksSlice.reducer;
