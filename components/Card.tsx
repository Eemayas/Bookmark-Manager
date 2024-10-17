/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { Website } from "@/app/types";
import { encode } from "qss";
import Link from "next/link";
import { LinkPreview } from "./ui/link-preview";

type CardProps = {
  website: Website;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const CodeCard: React.FC<CardProps> = ({
  website,
  width = 200,
  height = 125,
  quality = 50,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState<"edit" | "delete" | null>(
    null,
  );

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(website.url));
  }, [website.url]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (url: string) => url !== website.url,
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(website.url);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handleActionClick = (action: "edit" | "delete") => {
    setPopupAction(action);
    setShowPopup(true);
  };

  return (
    <div className="card mx-auto max-h-fit min-w-96 break-inside-avoid rounded-lg bg-[#24233b] p-4 shadow-lg transition-transform duration-500 hover:-translate-y-1">
      <div className="header m-1 mt-2 flex items-center justify-between space-x-4 rounded-md pl-2 pr-2">
        <div className="flex items-center space-x-2">
          <span className="red inline-block size-4 rounded-full bg-[#ff605c]" />
          <span className="yellow inline-block size-4 rounded-full bg-[#ffbd44]" />
          <span className="green inline-block size-4 rounded-full bg-[#00ca4e]" />
        </div>

        <div className="flex-grow text-center">
          <p
            className="max-w-full overflow-hidden hyphens-manual whitespace-normal break-all font-mono text-lg text-white"
            id="title2"
          >
            {website.name}
          </p>

          <LinkPreview
            url={website.url}
            className="max-w-full break-all font-mono text-sm font-medium text-blue-500 underline transition-colors duration-300 hover:text-gray-100 dark:text-blue-500"
          >
            {website.url}
          </LinkPreview>
        </div>

        <button
          onClick={toggleFavorite}
          className="ml-2 text-2xl focus:outline-none"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <div className="mt-5 space-y-4 rounded-md bg-[#49465c] p-4 font-mono text-white focus:outline-none">
        {/* <Image
          src={src}
          alt="jordans"
          height="200"
          width="200"
          className="w-[300px] rounded-md object-contain"
        /> */}
        <p className="line-clamp-3 text-lg text-white">{website.description}</p>
        <div className="hide-scrollbar mt-5 flex overflow-x-auto pb-2">
          <div className="flex flex-nowrap gap-2">
            {website.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block flex-shrink-0 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-normal capitalize text-blue-800 shadow-sm transition-all duration-300 hover:bg-blue-200 hover:text-blue-900 hover:shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clipRule="evenodd"
              />
              <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
            </svg>
            <span>{website.categories}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleActionClick("edit")}
              className="p-1 hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => handleActionClick("delete")}
              className="p-1 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-bold">
                {popupAction === "edit" ? "Edit Website" : "Delete Website"}
              </h2>
              <p>Are you sure you want to {popupAction} this website?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Implement edit or delete logic here
                    console.log(`${popupAction} website:`, website);
                    setShowPopup(false);
                  }}
                  className={`rounded px-4 py-2 text-white ${
                    popupAction === "edit"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
