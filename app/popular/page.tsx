"use client";
import React, { useEffect, useState } from "react";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/store";
import { PopularLinksCategoriesType } from "./types";
import { showAddWebsiteModal } from "@/components/Modals/store/modalReducer";
import { AddIcon } from "@/components/social-icons/icons";
import { fetchPopularLinks } from "./store/popularLinksSlice";

const PopularLinks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.popularLinks,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    Object.keys(data || {})[0] ? [Object.keys(data || {})[0]] : [],
  );
  const [selectedFilterSearchBar, setSelectedFilterSearchBar] =
    useState("Website");
    
  useEffect(() => {
    dispatch(fetchPopularLinks({}));
  }, [dispatch]);

  useEffect(() => {
 
    if (selectedTags.length === 0 && Object.keys(data)[0]) {
      setSelectedTags([Object.keys(data)[0]]);
      console.log({ data });
    }
  }, [data]);

  let tagCount: Record<string, number> = {};

  if (data) {
    Object.keys(data).forEach((category) => {
      if ((data as PopularLinksCategoriesType)[category]?.length > 0) {
        tagCount[category] =
          (data as PopularLinksCategoriesType)[category]?.length || 0;
      }
    });
  }

  return (
    <>
      <BookmarkLayout
        bookmarkstoDisplay={
          (data as PopularLinksCategoriesType)[selectedTags[0]] || []
        }
        tagCount={tagCount}
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilterSearchBar={selectedFilterSearchBar}
        setSelectedFilterSearchBar={setSelectedFilterSearchBar}
        sidebarMultiSelect={false}
        isPersonalBookmark={false}
      />
      <button
        onClick={() =>
          store.dispatch(
            showAddWebsiteModal({
              isShow: true,
              section: "Popular_Links",
            }),
          )
        }
        className="fixed bottom-3 right-3 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 text-white shadow-xl"
      >
        <AddIcon />
      </button>
    </>
  );
};

export default PopularLinks;
