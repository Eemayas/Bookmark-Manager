/** @format */
"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { Website } from "./types"; // Import shared type
import { Card } from "@/components/Card";

const Home = () => {
  const websites: Website[] = [
    {
      id: 1,
      name: "Stack Overflow",
      url: "https://stackoverflow.com",
      description:
        "A platform for developers to ask and answer coding questions.",
      tags: ["programming", "development", "coding"],
      categories: "Technology/Programming/Community",
    },
    {
      id: 2,
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "Comprehensive documentation for web developers.",
      tags: ["web development", "HTML", "CSS", "JavaScript"],
      categories: "Technology/Web Development/Documentation",
    },
    {
      id: 3,
      name: "Khan Academy",
      url: "https://www.khanacademy.org",
      description:
        "A non-profit educational platform providing free courses on a variety of subjects.",
      tags: ["education", "learning", "courses"],
      categories: "Education/Online Courses/Free Resources",
    },
    {
      id: 4,
      name: "Coursera",
      url: "https://www.coursera.org",
      description:
        "Online learning platform offering courses from top universities.",
      tags: ["education", "online courses", "universities"],
      categories: "Education/Online Courses/Professional Development",
    },
    {
      id: 5,
      name: "GitHub",
      url: "https://github.com",
      description:
        "A platform for hosting and collaborating on open-source projects.",
      tags: ["version control", "open source", "repositories"],
      categories: "Technology/Programming/Version Control",
    },
    {
      id: 6,
      name: "Hacker News",
      url: "https://news.ycombinator.com",
      description:
        "A community-driven platform for sharing and discussing technology and startup news.",
      tags: ["news", "technology", "startups"],
      categories: "Technology/News/Community",
    },
    {
      id: 7,
      name: "Behance",
      url: "https://www.behance.net",
      description: "A platform to showcase and discover creative work.",
      tags: ["design", "creativity", "portfolio"],
      categories: "Design/Portfolio/Showcase",
    },
    {
      id: 8,
      name: "Dribbble",
      url: "https://dribbble.com",
      description:
        "A community for designers to share their work and get feedback.",
      tags: ["design", "feedback", "community"],
      categories: "Design/Community/Feedback",
    },
    {
      id: 9,
      name: "Reddit",
      url: "https://www.reddit.com",
      description: "A network of communities based on people's interests.",
      tags: ["social media", "community", "forums"],
      categories: "Social Media/Forums/General",
    },
    {
      id: 10,
      name: "Product Hunt",
      url: "https://www.producthunt.com",
      description: "A place to discover the latest tech products and startups.",
      tags: ["startups", "technology", "products"],
      categories: "Business/Startups/Technology",
    },
  ];

  const groupWebsitesByCategory = (websites: Website[]) => {
    return websites.reduce((acc, website) => {
      // Extract the top-level category
      const topLevelCategory = website.categories.split("/")[0];

      // If the category doesn't exist, create an array for it
      if (!acc[topLevelCategory]) {
        acc[topLevelCategory] = [];
      }

      // Add the website to the respective category array
      acc[topLevelCategory].push(website);

      return acc;
    }, {} as Record<string, Website[]>);
  };

  const groupedWebsites = groupWebsitesByCategory(websites);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Grouped Websites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedWebsites).map(([category, sites]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <ul className="space-y-2">
              {sites.map((site) => (
                <li key={site.id} className="border-b pb-2">
                  <LinkPreview
                    url={site.url}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {site.name}
                  </LinkPreview>

                  <p className="text-sm text-gray-600">{site.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Card />
    </div>
  );
};

export default Home;
