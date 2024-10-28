"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import personalBookmarks from "@/constants/bookmarks.json";

const page = () => {
  const { user, isLoading } = useUser();
  const addWebsite = async () => {
    const failedIds: number[] = []; // Array to store IDs of failed requests
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
            failedIds.push(website.id); // Store the ID of the failed request
            throw new Error(`Error: ${response.statusText}`); // Handle error response
          }
          const data = await response.json(); // Assuming the API returns JSON
          console.log("Success:", data); // Log success message
        }),
      );
    } catch (error) {
      console.error("Failed to add websites:", error); // Log error message
    }
    console.log("Failed IDs:", failedIds); // Log the list of failed IDs
  };
  addWebsite();
  return <div>page</div>;
};

export default page;
