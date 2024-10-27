import React from "react";

const page = () => {
  // const addWebsite = async () => {
  //   const failedIds: number[] = []; // Array to store IDs of failed requests
  //   try {
  //     await Promise.all(
  //       personalBookmarks.map(async (website) => {
  //         const tempWebsite = {
  //           ...website,
  //           email_address: "prashantmanandhar2002@gmail.com",
  //         };
  //         const response = await fetch("http://localhost:3000/api/website", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(tempWebsite), // Use tempWebsite instead of website
  //         });

  //         if (!response.ok) {
  //           failedIds.push(website.id); // Store the ID of the failed request
  //           throw new Error(`Error: ${response.statusText}`); // Handle error response
  //         }
  //         const data = await response.json(); // Assuming the API returns JSON
  //         console.log("Success:", data); // Log success message
  //       }),
  //     );
  //   } catch (error) {
  //     console.error("Failed to add websites:", error); // Log error message
  //   }
  //   console.log("Failed IDs:", failedIds); // Log the list of failed IDs
  // };
  // addWebsite();
  return <div>page</div>;
};

export default page;
