"use client";
import React, { useState, useEffect } from "react";
import personalBookmarks from "../constants/bookmarks.json";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";
import { Website } from "./types";
import BookmarkModal from "./(home)/components/BookmarkModal";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFilterSearchBar, setSelectedFilterSearchBar] =
    useState("Website");
  const { user, isLoading } = useUser();
  const [fetchedWebsites, setFetchedWebsites] = useState<Website[]>([]); // New state for fetched websites

  // Function to fetch websites
  async function fetchWebsites() {
    try {
      const emailAddress = user?.email || ""; // Get the email address from the user object
      const response = await fetch(
        `http://localhost:3000/api/website?email_address=${encodeURIComponent(emailAddress)}`,
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(
        "Websites retrieved successfully:",
        data.websites.sort((a: Website, b: Website) => a.id - b.id),
      );
      setFetchedWebsites(data.websites); // Store fetched websites in state
    } catch (error) {
      console.error("Failed to fetch websites:", error);
    }
  }

  // Call the function to fetch websites only once when the component mounts
  useEffect(() => {
    fetchWebsites();
    console.log({ user });
  }, [user]); // Empty dependency array ensures it runs only once

  // Filter bookmarks based on search term
  const filteredBookmarks: Website[] = fetchedWebsites // Use fetchedWebsites instead of personalBookmarks
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
  // console.log({ filteredbookmarkstoDisplaylength: filteredBookmarks.length });
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
    <div>
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
      <BookmarkModal />
    </div>
  );
};
export default Home;
