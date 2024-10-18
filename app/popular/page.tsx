import React from "react";

const PopularLinks = () => {
  const axios = require("axios");
  const cheerio = require("cheerio");

  async function scrapeWebsiteData(url: string | URL) {
    try {
      // Fetch the HTML content of the URL
      const { data } = await axios.get(url);

      // Load the HTML into cheerio
      const $ = cheerio.load(data);

      // Extract the meta title
      const metaTitle = $('meta[name="title"]').attr("content");
      const pageTitle = metaTitle || $("title").text();

      // Extract the meta description
      const metaDescription =
        $('meta[name="description"]').attr("content") ||
        "No description available";

      // Extract the favicon URL
      let favicon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href");
      if (favicon && !favicon.startsWith("http")) {
        // Convert to absolute URL if it's relative
        const baseUrl = new URL(url);
        favicon = new URL(favicon, baseUrl).href;
      }

      console.log("Title:", pageTitle);
      console.log("Description:", metaDescription);
      console.log("Favicon:", favicon || "No favicon available");
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  }

  // Example usage
  scrapeWebsiteData(
    "https://www.freepik.com/premium-photo/young-sport-woman-isolated-blue-background-making-money-gesture_21950180.htm#page=2&query=resume&position=1&from_view=keyword",
  );

  return <div>PopularLinks</div>;
};

export default PopularLinks;
