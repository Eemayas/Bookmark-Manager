/** @format */
"use client";
import { useState } from "react";
import React from "react";
import { Website } from "./types"; // Import shared type
import { BookMarkCard } from "@/components/Card";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";

interface BookmarkLayoutProps {
  bookmarkstoDisplay: Website[];
}

const BookmarkLayout: React.FC<BookmarkLayoutProps> = ({
  bookmarkstoDisplay,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [selectedFilterSearchBar, setSelectedFilterSearchBar] =
    useState("Website");
  // Filter bookmarks based on search term
  const filteredBookmarks: Website[] = bookmarkstoDisplay
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
  console.log({ tagCount });

  return (
    <div className="flex">
      <Sidebar
        tagCount={tagCount}
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
      />
      <main className="flex-1">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilterSearchBar={selectedFilterSearchBar}
          setSelectedFilterSearchBar={setSelectedFilterSearchBar}
        />
        <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />
        <div className="mx-auto columns-1 gap-4 space-y-5 md:columns-2 lg:columns-2">
          {filteredBookmarks.map((website) => (
            <BookMarkCard key={website.id} website={website} />
          ))}
        </div>
      </main>
    </div>
  );
};
export default BookmarkLayout;
