import { combineReducers } from "@reduxjs/toolkit";
import popularlinks from "@/app/popular/store/popularLinksSlice";
import searchFilterationReducer from "@/app/(home)/slices/searchFilterationSlice";
import personalWebsiteReducer from "@/app/(home)/slices/personalWebsiteSlices";
import modalReducer from "../components/Modals/store/modalReducer";

const rootReducer = combineReducers({
  searchFilteration: searchFilterationReducer,
  popularLinks: popularlinks,
  modalState: modalReducer,
  personalWebsite: personalWebsiteReducer,
});

export default rootReducer;
