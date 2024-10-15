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

export function Card({
  website,
  width = 200,
  height = 125,
  quality = 50,
}: CardProps) {
  const params = encode({
    url: website.url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  });
  const src = `https://api.microlink.io/?${params}`;
  return (
    <div>
      <BackgroundGradient className="min-w-[32rem] max-w-[32rem] rounded-[22px] bg-blue-600 p-4 sm:p-10 dark:bg-zinc-900">
        <p className="mb-2 mt-4 text-base text-black sm:text-xl dark:text-neutral-200">
          {website.name}
        </p>

        <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
          {website.description}
        </p>
        <div className="mt-2">
          {website.tags.map((tag) => (
            <span
              key={tag}
              className="mb-1 mr-1 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </BackgroundGradient>
    </div>
  );
}
export function Cardv2({
  website,
  width = 200,
  height = 125,
  quality = 50,
}: CardProps) {
  const params = encode({
    url: website.url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  });
  const src = `https://api.microlink.io/?${params}`;
  return (
    <div>
      <div className="rounded-lg border border-white/20 bg-[rgba(17,25,40,0.09)] backdrop-blur-lg backdrop-saturate-100">
        <Image
          src={src}
          alt="jordans"
          height="300"
          width="300"
          className="object-contain"
        />
        <p className="mb-2 mt-4 text-base text-black sm:text-xl dark:text-neutral-200">
          {website.name}
        </p>

        <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
          {website.description}
        </p>
        <div className="mt-2">
          {website.tags.map((tag) => (
            <span
              key={tag}
              className="mb-1 mr-1 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const CodeCard: React.FC<CardProps> = ({
  website,
  width = 200,
  height = 125,
  quality = 50,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <div className="card mx-auto min-w-96 max-w-[450px] rounded-lg bg-[#24233b] p-4 shadow-lg transition-transform duration-500 hover:-translate-y-1">
      <div className="header m-1 mt-2 rounded-md">
        <div className="top flex items-center justify-between pl-2 pr-2">
          <div className="flex space-x-2">
            <div className="circle">
              <span className="red circle2 inline-block size-4 rounded-full bg-[#ff605c]"></span>
            </div>
            <div className="circle">
              <span className="yellow circle2 inline-block size-4 rounded-full bg-[#ffbd44]"></span>
            </div>
            <div className="circle">
              <span className="green circle2 inline-block size-4 rounded-full bg-[#00ca4e]"></span>
            </div>
          </div>
          <div className="title flex-grow text-center">
            <p className="font-mono text-lg text-white" id="title2">
              {website.name}
            </p>

            <LinkPreview
              url={website.url}
              className="font-mono text-sm text-gray-300 underline transition-colors duration-300 hover:text-gray-100"
            >
              {website.url}
            </LinkPreview>
          </div>
          <button
            onClick={toggleFavorite}
            className="ml-2 text-2xl focus:outline-none"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
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

        <div className="mt-4 flex items-center text-sm text-gray-300">
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
      </div>
    </div>
  );
};
