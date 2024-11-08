/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { PersonalWebsiteType } from "@/app/types";
import { LinkPreview } from "./ui/link-preview";
import { PopularLinksType } from "@/app/popular/types";
import { store } from "@/store";
import {
  showAddWebsiteModal,
  showDeleteModal,
  showStatusModal,
} from "@/components/Modals/store/modalReducer";
import { DeleteIcon, EditIcon, FolderIcon } from "./social-icons/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { updatePersonalWebsite } from "@/app/(home)/slices/personalWebsiteSlices";

type CardProps = {
  website: PersonalWebsiteType | PopularLinksType;
  isPersonalBookmark?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const BookMarkCard: React.FC<CardProps> = ({
  website,
  isPersonalBookmark = true,
  width = 200,
  height = 125,
  quality = 50,
}) => {
  const [isFavorite, setIsFavorite] = useState(website.isFavorities);
  const { user } = useUser();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(website.url));
  }, [website.url]);

  const toggleFavorite = () => {
    // const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    // if (isFavorite) {
    //   const updatedFavorites = favorites.filter(
    //     (url: string) => url !== website.url,
    //   );
    //   localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    // } else {
    //   favorites.push(website.url);
    //   localStorage.setItem("favorites", JSON.stringify(favorites));
    // }
    // setIsFavorite(!isFavorite);
    if (isPersonalBookmark) {
      if (!user) {
        console.error("User not found");
        store.dispatch(
          showStatusModal({
            status: "error",
            isShow: true,
            title: "Error",
            description: "User not found",
          }),
        );
        return;
      }

      store.dispatch(
        updatePersonalWebsite({
          _id: website._id,
          name: website.name,
          url: website.url,
          tags: website.tags,
          folderPath: website.folderPath,
          description: website.description,
          email_address: user?.nickname || "",
          isFavorities: !isFavorite,
        }),
      );
    }
  };

  const handleActionClick = (action: "edit" | "delete") => {
    if (action === "delete") {
      store.dispatch(
        showDeleteModal({
          isShow: true,
          _id: website._id || "",
          section: isPersonalBookmark ? "Personal_Website" : "Popular_Links",
        }),
      );
    } else if (action === "edit") {
      store.dispatch(
        showAddWebsiteModal({
          isShow: true,
          section: isPersonalBookmark ? "Personal_Website" : "Popular_Links",
          isEdit: true,
          data: {
            _id: website._id || "",
            name: website.name,
            link: website.url,
            tags: website.tags,
            folderPath: website.folderPath,
            description: website.description || "",
          },
        }),
      );
    }
  };

  return (
    <div className="card mx-auto max-h-fit w-full break-inside-avoid rounded-lg bg-[#24233b] p-4 shadow-lg transition-transform duration-500 hover:-translate-y-1">
      <div className="header m-1 mt-2 flex items-center justify-between space-x-4 rounded-md pl-2 pr-2">
        <div className="flex items-center space-x-2">
          <span className="red inline-block size-4 rounded-full bg-[#ff605c]" />
          <span className="yellow inline-block size-4 rounded-full bg-[#ffbd44]" />
          <span className="green inline-block size-4 rounded-full bg-[#00ca4e]" />
        </div>

        <div className="flex-grow text-center">
          <div className="flex flex-row items-center justify-center gap-2">
            <img
              src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${website.url}/&size=32`}
              alt={website.name}
              className="size-5 rounded-[5px] object-cover shadow-lg" // Added box shadow
            />

            <p
              className="max-w-full overflow-hidden hyphens-manual whitespace-normal break-all font-mono text-lg text-white"
              id="title2"
            >
              {website.name}
            </p>
          </div>

          <LinkPreview
            url={website.url}
            className="max-w-full break-all font-mono text-sm font-medium text-blue-500 underline transition-colors duration-300 hover:text-gray-100 dark:text-blue-500"
          >
            {website.url}
          </LinkPreview>
        </div>

        {isPersonalBookmark ? (
          <button
            onClick={toggleFavorite}
            className="ml-2 text-2xl focus:outline-none"
            aria-label={
              website.isFavorities
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {website.isFavorities ? "★" : "☆"}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="mt-5 space-y-4 rounded-md bg-[#49465c] p-4 font-mono text-white focus:outline-none">
        {website.description !== undefined ? (
          <p className="text-md line-clamp-3 text-white">
            {website.description}
          </p>
        ) : (
          ""
        )}

        <div
          className="scroll flex h-full flex-row flex-wrap gap-2 overflow-x-auto"
          data-radix-scroll-area-viewport=""
        >
          {website.tags.map((tag, index) => (
            <span
              key={tag + index}
              className="inline-block rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-normal capitalize text-blue-800 shadow-sm transition-all duration-300 hover:bg-blue-200 hover:text-blue-900 hover:shadow-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center">
            <FolderIcon />
            <span>{website.folderPath}</span>
          </div>
          <div className="flex space-x-2">
            <button
              aria-label="Edit Website Button"
              title="Edit Website Button"
              onClick={() => handleActionClick("edit")}
              className="p-1 hover:text-blue-500"
            >
              <EditIcon />
            </button>
            <button
              aria-label="Delete Website Button"
              title="Delete Website Button"
              onClick={() => handleActionClick("delete")}
              className="p-1 hover:text-red-500"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
