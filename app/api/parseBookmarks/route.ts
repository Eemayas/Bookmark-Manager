import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

function parseBookmarks(htmlFile: string): any[] {
  let htmlContent: string;

  try {
    htmlContent = fs.readFileSync(htmlFile, "utf-8");
  } catch (error) {
    console.error(`File ${htmlFile} not found.`, error);
    return [];
  }

  try {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    function processDL(dlElement: Element, currentPath: string[]): any[] {
      const bookmarks: any[] = [];
      let currentFolder: string | null = null;
      const allTags = Array.from(dlElement.querySelectorAll("dt, dl"));

      allTags.forEach((tag) => {
        if (tag.tagName.toLowerCase() === "dt") {
          const h3Tag = tag.querySelector("h3");
          const aTag = tag.querySelector("a");

          if (h3Tag) {
            currentFolder = h3Tag.textContent || "";
            const nestedDL = tag.nextElementSibling;

            if (nestedDL && nestedDL.tagName.toLowerCase() === "dl") {
              const newPath = [...currentPath, currentFolder];
              bookmarks.push(...processDL(nestedDL, newPath));
            }
          }

          if (aTag) {
            const link = aTag.getAttribute("href");
            const name = aTag.textContent || "";
            const path = currentPath.join(" / ");
            bookmarks.push({
              name,
              link,
              path,
            });
          }
        } else if (tag.tagName.toLowerCase() === "dl" && currentFolder) {
          const newPath = [...currentPath, currentFolder];
          bookmarks.push(...processDL(tag, newPath));
        }
      });

      return bookmarks;
    }

    const dlElement = document.querySelector("dl");
    if (!dlElement) {
      console.error("No bookmarks found in the HTML file.");
      return [];
    }

    const bookmarks = processDL(dlElement, []);
    return bookmarks;
  } catch (error) {
    console.error("Error parsing bookmarks HTML content.", error);
    return [];
  }
}

export async function GET() {
  try {
    const htmlFile = path.join(process.cwd(), "bookmarks_10_13_24.html");
    const parsedBookmarks = parseBookmarks(htmlFile);

    if (parsedBookmarks.length > 0) {
      const bookmarkSet = new Set<string>();
      const bookmarkList: any[] = [];

      parsedBookmarks.forEach((bookmark) => {
        if (!bookmarkSet.has(bookmark.link)) {
          bookmarkSet.add(bookmark.link);
          bookmarkList.push({
            name: bookmark.name,
            url: bookmark.link,
            description: "No description",
            tags: ["bookmarks"],
            categories: bookmark.path,
          });
        }
      });

      return NextResponse.json(bookmarkList);
    } else {
      return NextResponse.json({ message: "No bookmarks found" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
