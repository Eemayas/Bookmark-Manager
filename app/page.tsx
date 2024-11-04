"use client";
import React, { useState, useEffect } from "react";
import personalBookmarks from "../constants/bookmarks.json";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";
import { PersonalWebsiteType } from "./types";
import BookmarkModal from "./(home)/components/BookmarkModal";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/store";
import { getPersonalWebsites } from "./(home)/slices/personalWebsiteSlices";
import { AddIcon } from "@/components/social-icons/icons";
import { showAddWebsiteModal } from "@/components/Modals/store/modalReducer";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFilterSearchBar, setSelectedFilterSearchBar] =
    useState("Website");
  const { user, isLoading } = useUser();
  const [fetchedWebsites, setFetchedWebsites] = useState<PersonalWebsiteType[]>(
    [],
  ); // New state for fetched websites

  // Filter bookmarks based on search term
  const filteredBookmarks: PersonalWebsiteType[] = fetchedWebsites // Use fetchedWebsites instead of personalBookmarks
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

  const dispatch = useDispatch<AppDispatch>();
  const { websites, loading, error, successMessage } = useSelector(
    (state: RootState) => state.personalWebsite,
  );

  useEffect(() => {
    const emailAddress = user?.nickname || "";
    dispatch(getPersonalWebsites(emailAddress));
  }, [dispatch, user]);

  useEffect(() => {
    console.log({ websites });
    setFetchedWebsites(websites);
  }, [websites]);

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
      <button
        onClick={() =>
          store.dispatch(
            showAddWebsiteModal({
              isShow: true,
              section: "Personal_Website",
            }),
          )
        }
        className="fixed bottom-3 right-3 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 text-white shadow-xl"
      >
        <AddIcon />
      </button>
      {/* <BookmarkModal /> */}
    </div>
  );
};
export default Home;
