import React from "react";
import personalBookmarks from "../constants/bookmarks.json";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";

const Home = () => {
  return <BookmarkLayout bookmarkstoDisplay={personalBookmarks} />;
};
export default Home;
