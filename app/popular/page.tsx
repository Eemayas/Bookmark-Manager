"use client";
import React, { useEffect, useState } from "react";
import { Website } from "../types";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchLinks } from "./store/popularLinksSlice";
import { PopularLinksCategoriesType } from "./types";

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
    dispatch(fetchLinks({}));
  }, [dispatch]);

  useEffect(() => {
    setSelectedTags([Object.keys(data)[0]]);
    console.log({ data });
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
    />
  );
};

export default PopularLinks;
