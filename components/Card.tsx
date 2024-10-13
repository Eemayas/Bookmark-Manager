/** @format */

"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { Website } from "@/app/types";
import { encode } from "qss";

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
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Image
          src={src}
          alt="jordans"
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {website.name}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {website.description}
        </p>
        <div className="mt-2">
          {website.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </BackgroundGradient>
    </div>
  );
}
