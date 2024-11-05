import { PersonalWebsiteType } from "@/app/types";
import React from "react";

type BookmarksListProps = {
  websites: PersonalWebsiteType[];
  selectedTags: string[];
  searchTerm: string;
};

const BookmarksList: React.FC<BookmarksListProps> = ({
  websites,
  selectedTags,
  searchTerm,
}) => {
  const filteredWebsites = websites.filter((website) => {
    const matchesTags =
      selectedTags.length === 0 ||
      website.tags.some((tag) => selectedTags.includes(tag));
    const matchesSearch =
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.url.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTags && matchesSearch;
  });

  return (
    <div className="ml-64 p-4">
      {filteredWebsites.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredWebsites.map((website, index) => (
            <li key={`${website._id}-${index}`}>
              <div className="flex items-center justify-between rounded-md border border-gray-300 p-4">
                <div>
                  <h5 className="text-lg font-semibold">{website.name}</h5>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500"
                  >
                    {website.url}
                  </a>
                </div>
                <div className="flex space-x-2">
                  {website.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded bg-gray-200 px-2 py-1 text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarksList;
