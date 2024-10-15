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
  const websites: DataStructure = {
    Technology: {
      Programming: {
        Community: [
          {
            id: 1,
            name: "Stack Overflow",
            url: "https://stackoverflow.com",
            description:
              "A platform for developers to ask and answer coding questions.",
            tags: ["programming", "development", "coding"],
            categories: "Technology/Programming/Community",
          },
        ],
        "Version Control": [
          {
            id: 5,
            name: "GitHub",
            url: "https://github.com",
            description:
              "A platform for hosting and collaborating on open-source projects.",
            tags: ["version control", "open source", "repositories"],
            categories: "Technology/Programming/Version Control",
          },
        ],
      },
      "Web Development": {
        Documentation: [
          {
            id: 2,
            name: "MDN Web Docs",
            url: "https://developer.mozilla.org",
            description: "Comprehensive documentation for web developers.",
            tags: ["web development", "HTML", "CSS", "JavaScript"],
            categories: "Technology/Web Development/Documentation",
          },
        ],
      },
      News: {
        Community: [
          {
            id: 6,
            name: "Hacker News",
            url: "https://news.ycombinator.com",
            description:
              "A community-driven platform for sharing and discussing technology and startup news.",
            tags: ["news", "technology", "startups"],
            categories: "Technology/News/Community",
          },
        ],
      },
    },
    Education: {
      "Online Courses": {
        "Free Resources": [
          {
            id: 3,
            name: "Khan Academy",
            url: "https://www.khanacademy.org",
            description:
              "A non-profit educational platform providing free courses on a variety of subjects.",
            tags: ["education", "learning", "courses"],
            categories: "Education/Online Courses/Free Resources",
          },
        ],
        "Professional Development": [
          {
            id: 4,
            name: "Coursera",
            url: "https://www.coursera.org",
            description:
              "Online learning platform offering courses from top universities.",
            tags: ["education", "online courses", "universities"],
            categories: "Education/Online Courses/Professional Development",
          },
        ],
      },
    },
    Design: {
      Portfolio: {
        Showcase: [
          {
            id: 7,
            name: "Behance",
            url: "https://www.behance.net",
            description: "A platform to showcase and discover creative work.",
            tags: ["design", "creativity", "portfolio"],
            categories: "Design/Portfolio/Showcase",
          },
        ],
      },
      Try: [
        {
          id: 18,
          name: "Dribbblesss",
          url: "https://dribbble.codvsdvm",
          description:
            "A community fsdvsvsor designers to share their work and get feedback.",
          tags: ["design", "feedback", "community"],
          categories: "Design/Try",
        },
      ],
    },
    "Social Media": {
      Forums: {
        General: [
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
          {
            id: 9,
            name: "Reddit",
            url: "https://www.reddit.com",
            description:
              "A network of communities based on people's interests.",
            tags: ["social media", "community", "forums"],
            categories: "Social Media/Forums/General",
          },
        ],
      },
    },
    Business: {
      Startups: [
        {
          id: 10,
          name: "Product Hunt",
          url: "https://www.producthunt.com",
          description:
            "A place to discover the latest tech products and startups.",
          tags: ["startups", "technology", "products"],
          categories: "Business/Startups",
        },
      ],
    },
  };
  function flattenWebsites(websites: DataStructure): Website[] {
    const flattenedWebsites: Website[] = [];

    function traverse(obj: any, path: string[] = []) {
      for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          flattenedWebsites.push(
            ...value.map((site) => ({
              ...site,
              categories: [...path, key].join("/"),
            })),
          );
        } else if (typeof value === "object" && value !== null) {
          traverse(value, [...path, key]);
        }
      }
    }

    traverse(websites);
    return flattenedWebsites;
  }

  // Usage example:
  const flatWebsites = flattenWebsites(websites);
  console.log({ flatWebsites });

  return (
    <div className="container mx-auto p-4">
      <h1 className="py-4 text-center font-sans text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
        <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          Bookmarks Manager
        </span>
      </h1>
      <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3">
        {personalBookmarks.map((website) => (
          <CodeCard key={website.id} website={website} />
        ))}
      </div>
    </div>
  );
};
export default Home;
