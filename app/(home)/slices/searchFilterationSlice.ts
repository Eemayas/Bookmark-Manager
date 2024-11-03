import { createSlice } from "@reduxjs/toolkit";

// Create a slice for bookmarks
const personalBookmarksSlice = createSlice({
  name: "personalBookmark/searchFilteration",
  initialState: {
    searchTerm: "",
    selectedTags: [],
    selectedFilterSearchBar: "Website",
    filteredBookmarks: [],
    tagCount: {},
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedTags(state, action) {
      state.selectedTags = action.payload;
    },
    setSelectedFilterSearchBar(state, action) {
      state.selectedFilterSearchBar = action.payload;
    },
    setFilteredBookmarks(state, action) {
      state.filteredBookmarks = action.payload;
    },
    setTagCount(state, action) {
      state.tagCount = action.payload;
    },
  },
});

// Export actions
export const {
  setSearchTerm,
  setSelectedTags,
  setSelectedFilterSearchBar,
  setFilteredBookmarks,
  setTagCount,
} = personalBookmarksSlice.actions;

export default personalBookmarksSlice.reducer;
