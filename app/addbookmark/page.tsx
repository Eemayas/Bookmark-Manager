"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { use } from "react";
import personalBookmarks from "@/constants/bookmarks.json";
import popularBookmarks from "@/constants/popularslinks.json";
import { PopularLinksType } from "../popular/types";

const page = () => {
  const { user, isLoading } = useUser();
  console.log({ user });
  const addPersonalWebsite = async () => {
    try {
      await Promise.all(
        personalBookmarks.map(async (website) => {
          const tempWebsite = {
            ...website,
            email_address: user?.nickname,
          };
          const response = await fetch("http://localhost:3000/api/website", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tempWebsite), // Use tempWebsite instead of website
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`); // Handle error response
          }
          const data = await response.json(); // Assuming the API returns JSON
          console.log("Success:", data); // Log success message
        }),
      );
    } catch (error) {
      console.error("Failed to add websites:", error); // Log error message
    }
  };

  const addPopularWebistes = async () => {
    Object.keys(popularBookmarks).map((categories: string, index) =>
      (
        popularBookmarks[
          categories as keyof typeof popularBookmarks
        ] as PopularLinksType[]
      ).map(async (links) => {
        console.log({ categories, links });
        try {
          const response = await fetch(
            `http://localhost:3000/api/poularwebsite`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ category: categories, newLink: links }),
            },
          );
          const data = await response.json();
          // console.log({ data });
          return { categories, links };
        } catch (error) {
          return console.error(`Failed to add link ${error}`);
        }
      }),
    );

    Object.keys(popularBookmarks)
      .sort()
      .map((categories: string, index) =>
        console.log({
          categories,
          length:
            popularBookmarks[categories as keyof typeof popularBookmarks]
              .length,
        }),
      );
  };

  // addPopularWebistes();
  addPersonalWebsite();
  return <div>page</div>;
};

export default page;
