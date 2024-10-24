"use client";
import React, { useState, useRef } from "react";
import personalBookmarks from "../constants/bookmarks.json";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";
import { Website } from "./types";
import BookmarkModal from "./(home)/components/BookmarkModal";
import { run } from "@/lib/mongoose";
import { main } from "@/extraction";

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

  // New state for modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [newBookmark, setNewBookmark] = useState<Website>({
    id: 0,
    name: "",
    url: "",
    description: "",
    tags: [],
    categories: "",
  });

  // Function to handle form submission
  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new bookmark to personalBookmarks (you may need to update the state or context accordingly)
    personalBookmarks.push({
      ...newBookmark,
      description: newBookmark.description || "default description", // Ensure description is a string
    });
    setNewBookmark({
      id: 0,
      name: "",
      url: "",
      description: "",
      tags: [],
      categories: "",
    }); // Reset form
    setIsModalOpen(false); // Close modal
  };

  const addWebsite = async () => {
    const website = {
      id: 1,
      name: "Example",
      url: "https://example.com",
      description: "This is an example website",
      tags: ["example", "website"],
      categories: "tech",
      isFavorities: true,
      email_address: ["contact@example.com"],
    };

    const response = await fetch("http://localhost:3000/api/website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(website),
    });

    const data = await response.json();
    console.log(data);
  };
  addWebsite();
  run();
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
