import React from "react";
import Link from "next/link";

type SidebarProps = {
  tagCount: Record<string, number>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags: string[];
  multiSelect?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  tagCount,
  setSelectedTags,
  selectedTags,
  multiSelect = true,
}) => {
  function transformString(s: string): string {
    const parts = s.split("_");
    const capitalizedParts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1),
    );
    return capitalizedParts.join(" ");
  }

  const handleTagClick = (tag: string) => {
    if (multiSelect) {
      setSelectedTags?.((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    } else {
      setSelectedTags?.([]);
      setSelectedTags?.([tag]);
    }
  };

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-hidden lg:sticky lg:block lg:self-start">
      <div className="relative h-full overflow-hidden py-6 pr-6 lg:py-8">
        <style>
          {`
          [data-radix-scroll-area-viewport] {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* Internet Explorer and Edge */
            -webkit-overflow-scrolling: touch; /* iOS */
          }
          [data-radix-scroll-area-viewport]::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}
        </style>
        <div
          data-radix-scroll-area-viewport=""
          className="scroll h-full w-full overflow-y-auto"
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full">
              {/* Follow for Updates Section */}
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                  Follow for updates
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground transition duration-200 hover:translate-x-1 hover:text-emerald-500"
                    href="https://www.linkedin.com/in/prashant-manandhar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn @prashant-manandhar
                  </Link>
                </div>
              </div>

              {/* Tags Section */}
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                  Tags
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {Object.keys(tagCount).map((tag, index) => (
                    <button
                      key={`tag-selection-${index}`}
                      className={`flex w-full items-center rounded-md border border-transparent px-2 py-1 capitalize transition duration-200 hover:translate-x-1 hover:underline ${
                        selectedTags?.includes(tag) ? "text-emerald-500" : ""
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {transformString(tag)} ({tagCount[tag]})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
