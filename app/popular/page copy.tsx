"use client";
import React, { useState } from "react";
import popularlinkss from "@/constants/popularslinks.json";
import { PersonalWebsiteType } from "../types";
import BookmarkLayout from "@/layouts/BookmarkLayout/BookmarkLayout";

type PopularLinksType = {
  [key: string]: PersonalWebsiteType[];
};

const PopularLinks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    Object.keys(popularlinkss)[0],
  ]);
  const [selectedFilterSearchBar, setSelectedFilterSearchBar] =
    useState("Website");
  let tagCount: Record<string, number> = {};

  Object.keys(popularlinkss).forEach((category) => {
    tagCount[category] = (popularlinkss as PopularLinksType)[category].length;
  });

  return (
    <BookmarkLayout
      bookmarkstoDisplay={(popularlinkss as PopularLinksType)[selectedTags[0]]}
      tagCount={tagCount}
      setSelectedTags={setSelectedTags}
      selectedTags={selectedTags}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedFilterSearchBar={selectedFilterSearchBar}
      setSelectedFilterSearchBar={setSelectedFilterSearchBar}
      sidebarMultiSelect={false}
    />
    // <div className="flex">
    //   <Sidebar
    //     tagCount={tagCount}
    //     setSelectedTags={setSelectedTags}
    //     selectedTags={selectedTags}
    //     multiSelect={false}
    //   />

    //   <main className="flex-1">
    //     <SearchBar
    //       searchTerm={searchTerm}
    //       setSearchTerm={setSearchTerm}
    //       selectedFilterSearchBar={selectedFilterSearchBar}
    //       setSelectedFilterSearchBar={setSelectedFilterSearchBar}
    //     />
    //     <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />
    //     <div className="mx-auto columns-1 gap-4 space-y-5 md:columns-2 lg:columns-2">
    //       {(popularlinkss as PopularLinksType)[selectedTags[0]].map((website) => (
    //         <BookMarkCard key={website.id} website={website} />
    //       ))}
    //     </div>
    //   </main>
    // </div>
  );
};

export default PopularLinks;
