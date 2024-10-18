import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedFilterSearchBar: string;
  setSelectedFilterSearchBar: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilterSearchBar,
  setSelectedFilterSearchBar,
}) => {
  const filterOptions = [
    { label: "Website", value: "Website" },
    { label: "Link", value: "Link" },
    { label: "Tags", value: "Tags" },
    { label: "Folder", value: "Folder" },
  ];

  return (
    <form className="mx-auto max-w-lg rounded-md border-2 border-blue-500">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Field Filter"
            className="z-10 mx-auto inline-flex sm:w-28  flex-shrink-0 items-center justify-between rounded-s-md bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
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
  );
};

export default SearchBar;
