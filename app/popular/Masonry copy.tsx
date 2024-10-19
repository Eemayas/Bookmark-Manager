import { useLayoutEffect, useState, useRef, useEffect, ReactNode } from "react";

interface MosaicListProps {
  children: ReactNode[];
  columns: { [breakpoint: string]: number }; // Updated to accept column count based on breakpoints
}

function App() {
  return (
    <MosaicList columns={{ md: 2, lg: 3 }}>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "120px" }}
      >
        1
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "430px" }}
      >
        2
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "350px" }}
      >
        3
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "280px" }}
      >
        4
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "320px" }}
      >
        5
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "310px" }}
      >
        6
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "360px" }}
      >
        7
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "270px" }}
      >
        8
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "360px" }}
      >
        9
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "410px" }}
      >
        10
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "190px" }}
      >
        11
      </div>
      <div
        className="m-4 flex min-w-32 items-center justify-center bg-gray-300 p-5 text-3xl"
        style={{ height: "270px" }}
      >
        12
      </div>
    </MosaicList>
  );
}

function MosaicList({ children, columns }: MosaicListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenWidth] = useWindowSize();
  const columnCount = getColumnCount(screenWidth, columns); // Get column count based on screen width
  console.log({ columnCount });
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Set the grid template columns based on the column count
      container.style.display = "grid";
      container.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
      container.style.gap = "16px"; // Add gap between items
    }
  }, [children, columnCount]);

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
    </div>
  );
}

// Helper function to determine column count based on screen width and breakpoints
function getColumnCount(
  screenWidth: number,
  columns: { [breakpoint: string]: number },
): number {
  // Tailwind CSS breakpoints
  const tailwindBreakpoints = {
    sm: 640, // Small devices
    md: 768, // Medium devices
    lg: 1024, // Large devices
    xl: 1280, // Extra large devices
    "2xl": 1536, // 2X extra large devices
  };

  // Combine user-defined breakpoints with Tailwind breakpoints
  const breakpoints = Object.keys(columns)
    .map(
      (bp) =>
        tailwindBreakpoints[bp as keyof typeof tailwindBreakpoints] ||
        Number(bp),
    ) // Use Tailwind breakpoints or fallback to numeric
    .sort((a, b) => a - b);

  console.log("Breakpoints:", breakpoints); // Log the breakpoints array
  console.log("Screen Width:", screenWidth); // Log the current screen width

  for (let i = breakpoints.length - 1; i >= 0; i--) {
    console.log("Checking breakpoint:", breakpoints[i]); // Log each breakpoint being checked
    if (screenWidth >= breakpoints[i]) {
      console.log("Matched column count:", columns[Object.keys(columns)[i]]); // Log the matched column count
      return columns[Object.keys(columns)[i]];
    }
  }
  console.log("Defaulting to 1 column"); // Log when defaulting to 1 column
  return 1; // Default to 1 column if no breakpoints match
}

export default App;

function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
