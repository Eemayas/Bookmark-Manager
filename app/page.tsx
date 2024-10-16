/** @format */
"use client";
import React from "react";
import { Website } from "./types"; // Import shared type
import { CodeCard } from "@/components/Card";
import personalBookmarks from "../constants/bookmarks.json";
type NestedCategory = {
  [key: string]: Website[] | NestedCategory;
};

type DataStructure = {
  [key: string]: NestedCategory;
};
const Home = () => {
  // const websites: DataStructure = {
  //   Technology: {
  //     Programming: {
  //       Community: [
  //         {
  //           id: 1,
  //           name: "Stack Overflow",
  //           url: "https://stackoverflow.com",
  //           description:
  //             "A platform for developers to ask and answer coding questions.",
  //           tags: ["programming", "development", "coding"],
  //           categories: "Technology/Programming/Community",
  //         },
  //       ],
  //       "Version Control": [
  //         {
  //           id: 5,
  //           name: "GitHub",
  //           url: "https://github.com",
  //           description:
  //             "A platform for hosting and collaborating on open-source projects.",
  //           tags: ["version control", "open source", "repositories"],
  //           categories: "Technology/Programming/Version Control",
  //         },
  //       ],
  //     },
  //     "Web Development": {
  //       Documentation: [
  //         {
  //           id: 2,
  //           name: "MDN Web Docs",
  //           url: "https://developer.mozilla.org",
  //           description: "Comprehensive documentation for web developers.",
  //           tags: ["web development", "HTML", "CSS", "JavaScript"],
  //           categories: "Technology/Web Development/Documentation",
  //         },
  //       ],
  //     },
  //     News: {
  //       Community: [
  //         {
  //           id: 6,
  //           name: "Hacker News",
  //           url: "https://news.ycombinator.com",
  //           description:
  //             "A community-driven platform for sharing and discussing technology and startup news.",
  //           tags: ["news", "technology", "startups"],
  //           categories: "Technology/News/Community",
  //         },
  //       ],
  //     },
  //   },
  //   Education: {
  //     "Online Courses": {
  //       "Free Resources": [
  //         {
  //           id: 3,
  //           name: "Khan Academy",
  //           url: "https://www.khanacademy.org",
  //           description:
  //             "A non-profit educational platform providing free courses on a variety of subjects.",
  //           tags: ["education", "learning", "courses"],
  //           categories: "Education/Online Courses/Free Resources",
  //         },
  //       ],
  //       "Professional Development": [
  //         {
  //           id: 4,
  //           name: "Coursera",
  //           url: "https://www.coursera.org",
  //           description:
  //             "Online learning platform offering courses from top universities.",
  //           tags: ["education", "online courses", "universities"],
  //           categories: "Education/Online Courses/Professional Development",
  //         },
  //       ],
  //     },
  //   },
  //   Design: {
  //     Portfolio: {
  //       Showcase: [
  //         {
  //           id: 7,
  //           name: "Behance",
  //           url: "https://www.behance.net",
  //           description: "A platform to showcase and discover creative work.",
  //           tags: ["design", "creativity", "portfolio"],
  //           categories: "Design/Portfolio/Showcase",
  //         },
  //       ],
  //     },
  //     Try: [
  //       {
  //         id: 18,
  //         name: "Dribbblesss",
  //         url: "https://dribbble.codvsdvm",
  //         description:
  //           "A community fsdvsvsor designers to share their work and get feedback.",
  //         tags: ["design", "feedback", "community"],
  //         categories: "Design/Try",
  //       },
  //     ],
  //   },
  //   "Social Media": {
  //     Forums: {
  //       General: [
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //         {
  //           id: 9,
  //           name: "Reddit",
  //           url: "https://www.reddit.com",
  //           description:
  //             "A network of communities based on people's interests.",
  //           tags: ["social media", "community", "forums"],
  //           categories: "Social Media/Forums/General",
  //         },
  //       ],
  //     },
  //   },
  //   Business: {
  //     Startups: [
  //       {
  //         id: 10,
  //         name: "Product Hunt",
  //         url: "https://www.producthunt.com",
  //         description:
  //           "A place to discover the latest tech products and startups.",
  //         tags: ["startups", "technology", "products"],
  //         categories: "Business/Startups",
  //       },
  //     ],
  //   },
  // };
  // function flattenWebsites(websites: DataStructure): Website[] {
  //   const flattenedWebsites: Website[] = [];

  //   function traverse(obj: any, path: string[] = []) {
  //     for (const [key, value] of Object.entries(obj)) {
  //       if (Array.isArray(value)) {
  //         flattenedWebsites.push(
  //           ...value.map((site) => ({
  //             ...site,
  //             categories: [...path, key].join("/"),
  //           })),
  //         );
  //       } else if (typeof value === "object" && value !== null) {
  //         traverse(value, [...path, key]);
  //       }
  //     }
  //   }

  //   traverse(websites);
  //   return flattenedWebsites;
  // }

  // // Usage example:
  // const flatWebsites = flattenWebsites(websites);
  // console.log({ flatWebsites });

  return (
    <div className="container mx-auto p-4">
      <h1 className="py-4 text-center font-sans text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
        <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          Bookmarks Manager
        </span>
      </h1>
      <div className="grid-cols-[repeat(auto-fill),minmax(9%,1fr))] grid gap-x-4 gap-y-0 p-4">
        <div className="flex h-96 items-center justify-center bg-blue-300 p-4">
          Item 1 - Short Content
        </div>
        <div className="col-span-2 flex h-16 items-center justify-center bg-green-300 p-4">
          Item 2 - This item has longer content. It will take more height based
          on its content.
        </div>
        <div className="flex items-center justify-center bg-red-300 p-4">
          Item 3 - Short Content
        </div>
        <div className="col-span-2 flex items-center justify-center bg-yellow-300 p-4">
          Item 4 - Another long content item that will take as much space as it
          needs to fit the content.
        </div>
        <div className="flex items-center justify-center bg-purple-300 p-4">
          Item 5 - Short Content
        </div>
        <div className="col-span-3 flex items-center justify-center bg-pink-300 p-4">
          Item 6 - Even longer content that might wrap over multiple lines.
        </div>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(9%,1fr))] grid-rows-[repeat(auto-fill,minmax(4%,1fr))] gap-4">
        <div className="h-72 bg-gray-200 p-4">1st</div>
        <div className="h-14 bg-gray-200 p-4">2nd</div>
        <div className="h-14 bg-gray-200 p-4">3rd</div>
        <div className="h-72 bg-gray-200 p-4">4th</div>
      </div>

      <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />
      <div className="flex">
        <Sidebar />
        {/* <div className="flex-1 pl-4"> */}
        <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personalBookmarks.map((website) => (
            <CodeCard key={website.id} website={website} />
          ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default Home;
import Link from "next/link";

export function Sidebar() {
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
                  Installation
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/docs/install-nextjs"
                  >
                    Install Next.js
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/docs/install-tailwindcss"
                  >
                    Install Tailwind CSS
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/docs/add-utilities"
                  >
                    Add utilities
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="/docs/cli"
                  >
                    CLI
                  </Link>
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
