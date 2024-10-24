// app/bookmarks/page.tsx

// async function getBookmarks() {
//     const res = await fetch(`https://3001-idx-bookmark-manager-1729744786396.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/parseBookmarks`);
   
//    console.log({res})
//     if (!res.ok) {
//       throw new Error('Failed to fetch bookmarks');
//     }
//     return res.json();
//   }
  
  // export default async function BookmarksPage() {
  //   // const bookmarks = await getBookmarks();
  
  //   return (
  //     <div>
        
  //     </div>
  //   );
  // }
  

"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

function FileUploadDemo() {
  const [files, setFiles] = useState<Fdrile[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}

export default FileUploadDemo;
