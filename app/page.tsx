/** @format */
"use client";
import React, { useState } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { Website } from "./types"; // Import shared type
import { Card } from "@/components/Card";
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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    Object.keys(websites)[0],
  );
  return (
    <div className="container mx-auto p-4">
      <h1 className="py-4 text-center font-sans text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
        <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          Bookmarks Manager
        </span>
      </h1>
      <hr className="my-8 h-[2px] border-0 bg-gray-300 dark:bg-gray-600" />

      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {Object.keys(websites).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
              selectedCategory === category
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <WebsitesDisplay websites={flatWebsites} />
      {selectedCategory && (
        <CategoryGroupByFolder
          categories={{ [selectedCategory]: websites[selectedCategory] }}
          level={0}
        />
      )}
    </div>
  );
};

const WebsitesDisplay: React.FC<{
  websites: Website[];
}> = ({ websites }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {websites.map((website) => (
        <Card key={website.id} website={website} />
      ))}
    </div>
  );
};

// New recursive component to display categories and websites
const CategoryGroupByFolder: React.FC<{
  categories: Record<string, any>;
  level: number;
}> = ({ categories, level }) => {
  return (
    <div className={`ml-${level * 4}`}>
      {Object.entries(categories).map(([category, content]) => {
        // console.log(`Category: ${category}`, content);
        return (
          <div key={category} className="mb-4">
            {/* {level !== 0 && (<h1 className={`text-${3 - level}xl md:text-${6 - level}xl lg:text-${7 - level}xl font-bold  font-sans tracking-tight py-4`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
        {category}
        </span>
      </h1>)} */}
            {Array.isArray(content) ? (
              <div className="flex flex-wrap gap-4">
                {content.map((website: Website) => (
                  <Card key={website.id} website={website} />
                ))}
              </div>
            ) : null}
            {!Array.isArray(content) && (
              <CategoryGroupByFolder categories={content} level={level + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
