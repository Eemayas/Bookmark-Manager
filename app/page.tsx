"use client";
import React, { useState, useRef } from "react";
import personalBookmarks from "../constants/bookmarks.json";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";
import { Website } from "./types";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [selectedFilterSearchBar, setSelectedFilterSearchBar] =
    useState("Website");
  // Filter bookmarks based on search term
  const filteredBookmarks: Website[] = personalBookmarks
    .filter((website) => {
      const searchValue = searchTerm.toLowerCase();

      if (selectedFilterSearchBar === "Website") {
        return website.name.toLowerCase().includes(searchValue);
      } else if (selectedFilterSearchBar === "Link") {
        return website.url.toLowerCase().includes(searchValue);
      } else if (selectedFilterSearchBar === "Tags") {
        return website.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue),
        );
      } else if (selectedFilterSearchBar === "Folder") {
        return website.categories.toLowerCase().includes(searchValue);
      }

      return false;
    })
    .filter((website) => {
      // Check if the website tags include any of the selectedTags
      if (selectedTags.length === 0) return true; // If no tags are selected, include all
      console.log({ selectedTags });
      return selectedTags.every((tag) => {
        return website.tags
          .map((t) => t.toLowerCase())
          .includes(tag.toLowerCase());
      });
    });
  // Count the tags
  let tagCount: Record<string, number> = {};

  filteredBookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  console.log({ filteredbookmarkstoDisplaylength: filteredBookmarks.length });
  // Sort the tags in alphabetical order
  const sortedTagCount = Object.keys(tagCount)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = tagCount[key];
        return acc;
      },
      {} as Record<string, number>,
    );

  tagCount = sortedTagCount;



  return (
    <BookmarkLayout
      bookmarkstoDisplay={filteredBookmarks}
      tagCount={tagCount}
      setSelectedTags={setSelectedTags}
      selectedTags={selectedTags}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedFilterSearchBar={selectedFilterSearchBar}
      setSelectedFilterSearchBar={setSelectedFilterSearchBar}
      // displayCount={displayCount}
    />
  );
};
export default Home;
