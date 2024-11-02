import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// Function to parse bookmarks from an HTML file
function parseBookmarks(htmlFile: string): any[] {
  let htmlContent: string;
  
  // Try reading the file
  try {
    htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  } catch (error) {
    console.error(`File ${htmlFile} not found.`);
    return [];
  }

  // Parse the HTML content using JSDOM
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // Recursive function to process <dl> tags
  function processDL(dlElement: Element, currentPath: string[]): any[] {
    const bookmarks: any[] = [];
    let currentFolder: string | null = null;
    const allTags = Array.from(dlElement.querySelectorAll('dt, dl'));

    allTags.forEach(tag => {
      if (tag.tagName.toLowerCase() === 'dt') {
        const h3Tag = tag.querySelector('h3');
        const aTag = tag.querySelector('a');
        
        // If <h3> found, it's a folder
        if (h3Tag) {
          currentFolder = h3Tag.textContent || '';
          const nestedDL = tag.nextElementSibling;
          
          if (nestedDL && nestedDL.tagName.toLowerCase() === 'dl') {
            const newPath = [...currentPath, currentFolder];
            bookmarks.push(...processDL(nestedDL, newPath));
          }
        }

        // If <a> found, it's a bookmark
        if (aTag) {
          const link = aTag.getAttribute('href');
          const name = aTag.textContent || '';
          const path = currentPath.join(' / ');
          bookmarks.push({
            name,
            link,
            path
          });
        }
      } else if (tag.tagName.toLowerCase() === 'dl' && currentFolder) {
        const newPath = [...currentPath, currentFolder];
        bookmarks.push(...processDL(tag, newPath));
      }
    });

    return bookmarks;
  }

  // Find the main <dl> tag
  const dlElement = document.querySelector('dl');
  if (!dlElement) {
    console.error('No bookmarks found in the HTML file.');
    return [];
  }

  // Start processing the <dl> tag
  const bookmarks = processDL(dlElement, []);
  return bookmarks;
}

// Main function to process and save bookmarks
export function main() {
  const htmlFile = path.join(__dirname, 'bookmarks_10_13_24.html');
  const parsedBookmarks = parseBookmarks(htmlFile);

  if (parsedBookmarks.length > 0) {
    console.log(`Number of parsed bookmarks: ${parsedBookmarks.length}`);
    
    const bookmarkSet = new Set<string>();
    const bookmarkList: any[] = [];

    // Remove duplicates and create structured bookmarks
    parsedBookmarks.forEach((bookmark, index) => {
      if (!bookmarkSet.has(bookmark.link)) {
        bookmarkSet.add(bookmark.link);
        bookmarkList.push({
          name: bookmark.name,
          url: bookmark.link,
          description: 'No description',
          tags: ['bookmarks'],
          categories: bookmark.path
        });
      }
    });

    const outputFile = path.join(__dirname, 'constants', 'bookmarks.json');
    
    // Save to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(bookmarkList, null, 2), 'utf-8');
    console.log(`Bookmarks saved to ${outputFile}`);
    console.log(`Number of bookmarks: ${bookmarkList.length}`);
  }
}

// Run the main function
main();
