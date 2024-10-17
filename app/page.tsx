/** @format */
"use client";
import React from "react";
import { Website } from "./types"; // Import shared type
import { CodeCard } from "@/components/Card";
import personalBookmarks from "../constants/bookmarks.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type NestedCategory = {
  [key: string]: Website[] | NestedCategory;
};

type DataStructure = {
  [key: string]: NestedCategory;
};
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
        ); // Check if any tag matches
      } else if (selectedFilterSearchBar === "Folder") {
        return website.categories.toLowerCase().includes(searchValue);
      }

      return false;
    })
    .filter((website) => {
      // Check if the website tags include any of the selectedTags
      if (selectedTags.length === 0) return true; // If no tags are selected, include all

      return selectedTags.every((tag) =>
        website.tags.includes(tag.toLowerCase()),
      );
    });

  const filterOptions = [
    { label: "Website", value: "Website" },
    { label: "Link", value: "Link" },
    { label: "Tags", value: "Tags" },
    { label: "Folder", value: "Folder" },
  ];

  // Count the tags
  const tagCount: Record<string, number> = {};

  filteredBookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  console.log({ tagCount });

  return (
    <div className="container mx-auto p-4">
      <form className="mx-auto max-w-lg rounded-md border-2 border-blue-500">
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Field Filter"
              className="z-10 mx-auto inline-flex w-28 flex-shrink-0 items-center justify-between rounded-s-md bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              {selectedFilterSearchBar}{" "}
              <svg
                className="ms-2.5 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => setSelectedFilterSearchBar(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mx-auto flex w-full max-w-md overflow-hidden px-4 py-3 font-[sans-serif]">
            <input
              type="email"
              placeholder="Search Something..."
              className="w-full bg-transparent text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>
        </div>
      </form>
      <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />

      <div className="flex">
        <Sidebar tagCount={tagCount} setSelectedTags={setSelectedTags} />
        {/* <GridLayout /> */}
        <div className="mx-auto columns-1 gap-4 space-y-5 md:columns-2 lg:columns-2">
          {filteredBookmarks.map((website) => (
            <CodeCard key={website.id} website={website} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
import Link from "next/link";

export function Sidebar({
  tagCount,
  setSelectedTags,
}: {
  tagCount: Record<string, number>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 lg:sticky lg:block lg:self-start">
      {/* <aside className="w-64 shrink-0 lg:sticky lg:self-start"></aside> */}
      <div className="relative h-full overflow-hidden py-6 pr-6 lg:py-8">
        <style>
          {`
            [data-radix-scroll-area-viewport] {
              scrollbar-width: none;
              -ms-overflow-style: none;
              -webkit-overflow-scrolling: touch;
            }
            [data-radix-scroll-area-viewport]::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div
          data-radix-scroll-area-viewport=""
          className="scroll h-full w-full overflow-hidden rounded-[inherit]"
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full">
              {/* Follow for Updates Section */}
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                  Follow for updates
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="https://twitter.com/mannupaaji"
                    target="_blank"
                  >
                    Twitter @mannupaaji
                  </Link>
                </div>
              </div>

              {/* Installation Section */}
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                  Tags
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {Object.keys(tagCount).map((tag, index) => (
                    <div
                      className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 capitalize text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                      onClick={() => {
                        setSelectedTags((prev) => [...prev, tag]);
                      }}
                    >
                      {tag} ({tagCount[tag]})
                    </div>
                  ))}
                </div>
              </div>

              {/* All Components Section */}
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                  All Components
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/components/3d-card-effect"
                  >
                    3D Card Effect
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/components/3d-pin"
                  >
                    3D Pin
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/components/animated-modal"
                  >
                    Animated Modal
                  </Link>
                  {/* Add more component links similarly */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

import { useState, useMemo } from "react";

const GridLayout = () => {
  const [columns, setColumns] = useState<number>(3);
  const [columnGap, setColumnGap] = useState<number>(1);

  // Handle changes for each setting
  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumns(parseInt(e.target.value));
  };

  const handleColumnGapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnGap(parseInt(e.target.value));
  };

  // Generate random heights for grid items
  const randomHeights = useMemo(() => {
    return Array(12)
      .fill(0)
      .map(() => Math.floor(Math.random() * (300 - 100 + 1) + 100));
  }, []);

  return (
    <div className="w-[900px]">
      <div
        className="bg-black p-4"
        style={{
          columnCount: columns,
          columnGap: `${columnGap}rem`,
        }}
      >
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map(
          (item, index) => (
            <div
              key={item}
              className="mb-4 break-inside-avoid bg-gray-800 p-4 text-center text-xl font-bold"
              style={{
                height: `${randomHeights[index]}px`,
                width: "100%", // Allow the item to take full width of the column
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>
    </div>
  );
};
