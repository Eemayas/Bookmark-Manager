// app/bookmarks/page.tsx
// "use client";
// import React, { useState } from "react";
// import { FileUpload } from "@/components/ui/file-upload";
async function getBookmarks() {
  const res = await fetch(`http://localhost:3000/api/parseBookmarks`);

  console.log({ res });
  if (!res.ok) {
    throw new Error("Failed to fetch bookmarks");
  }
  return res.json();
}

async function FileUploadDemo() {
  const bookmarks = await getBookmarks();
  console.log({bookmarks})

  // const [files, setFiles] = useState<File[]>([]);
  // const handleFileUpload = (files: File[]) => {
  //   setFiles(files);
  //   console.log(files);
  // };

  return (
    <>sv</>
    // <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
    //   <FileUpload onChange={handleFileUpload} />
    // </div>
  );
}

export default FileUploadDemo;
