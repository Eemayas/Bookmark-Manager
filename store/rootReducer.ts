import { combineReducers } from "@reduxjs/toolkit";

import personalBookmarksReducer from "@/app/(home)/slices/bookmarksSlice";

const rootReducer = combineReducers({
  personalBookmark: personalBookmarksReducer,
});

export default rootReducer;
