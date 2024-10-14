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
