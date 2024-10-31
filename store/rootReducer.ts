import { combineReducers } from "@reduxjs/toolkit";
import popularlinks from "@/app/popular/store/popularLinksSlice";
import personalBookmarksReducer from "@/app/(home)/slices/bookmarksSlice";

const rootReducer = combineReducers({
  personalBookmark: personalBookmarksReducer,
  popularLinks: popularlinks,
});

export default rootReducer;
