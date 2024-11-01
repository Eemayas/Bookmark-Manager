/** @format */
"use client";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { BookMarkCard } from "@/components/Card";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import { MosaicList } from "@/components/MosaicList/MosaicList";
import { Website } from "@/app/types";
import { PopularLinksType } from "@/app/popular/types";

interface BookmarkLayoutProps {
  bookmarkstoDisplay: Website[] | PopularLinksType[];
  tagCount: Record<string, number>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags: string[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedFilterSearchBar: string;
  setSelectedFilterSearchBar: React.Dispatch<React.SetStateAction<string>>;
  sidebarMultiSelect?: boolean;
  // displayCount?: number;
}

const BookmarkLayout: React.FC<BookmarkLayoutProps> = ({
  bookmarkstoDisplay,
  tagCount,
  setSelectedTags,
  selectedTags,
  searchTerm,
  setSearchTerm,
  selectedFilterSearchBar,
  setSelectedFilterSearchBar,
  sidebarMultiSelect = true,
  // displayCount = 20,
}) => {
  const [displayCount, setDisplayCount] = useState<number>(20);

  const filteredBookmarksRef = useRef(bookmarkstoDisplay); // Create a ref for filteredBookmarks

  // Update the ref whenever filteredBookmarks changes
  React.useEffect(() => {
    filteredBookmarksRef.current = bookmarkstoDisplay;
  }, [bookmarkstoDisplay]);

  // Function to handle scroll event
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // Adjusted to trigger before reaching the bottom
    if (bottom) {
      console.log({
        ibookmarkstoDisplaylength: filteredBookmarksRef.current.length, // Use ref to get latest value
        iupdated: Math.min(
          displayCount + 20,
          filteredBookmarksRef.current.length,
        ),
      });
      setDisplayCount((prevCount) =>
        Math.min(prevCount + 20, filteredBookmarksRef.current.length),
      ); // Load more items
    }
  };
  console.log({
    bookmarkstoDisplaylength: bookmarkstoDisplay.length,
    updated: Math.min(displayCount + 20, bookmarkstoDisplay.length),
  });
  // Add scroll event listener
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex">
      <Sidebar
        tagCount={tagCount}
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        multiSelect={sidebarMultiSelect}
      />

      <main className="flex-1">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilterSearchBar={selectedFilterSearchBar}
          setSelectedFilterSearchBar={setSelectedFilterSearchBar}
        />
        <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />
        <MosaicList columns={{ md: 2 }}>
          {bookmarkstoDisplay.slice(0, displayCount).map((website) => (
            <BookMarkCard key={website.id} website={website} />
          ))}
        </MosaicList>
      </main>
    </div>
  );
};
export default BookmarkLayout;
