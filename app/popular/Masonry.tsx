import { cloneElement, useLayoutEffect, useState, ReactNode } from "react";
import "./ss.css";
interface MosaicListProps {
  children: ReactNode[];
  columns: { [breakpoint: string]: number };
}

function App() {
  return (
    <MosaicList columns={{ md: 2, lg: 3 }}>
      <div className="item">
        1 <br />1<br />1
      </div>
      <div className="item" style={{ height: "430px" }}>
        2
      </div>
      <div className="item" style={{ height: "350px" }}>
        3
      </div>
      <div className="item" style={{ height: "280px" }}>
        4
      </div>
      <div className="item" style={{ height: "320px" }}>
        5
      </div>
      <div className="item" style={{ height: "310px" }}>
        6
      </div>
      <div className="item" style={{ height: "360px" }}>
        7
      </div>
      <div className="item" style={{ height: "270px" }}>
        8
      </div>
      <div className="item" style={{ height: "360px" }}>
        9
      </div>
      <div className="item" style={{ height: "410px" }}>
        10
      </div>
      <div className="item" style={{ height: "190px" }}>
        11
      </div>
      <div className="item" style={{ height: "270px" }}>
        12
      </div>
    </MosaicList>
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

export function MosaicList({ children, columns }: MosaicListProps) {
  const [screenWidth] = useWindowSize();
  const columnCount = getColumnCount(screenWidth, columns);
  const cols = Array.from({ length: columnCount }, (_, i) => i);
  const rows = Array.from(
    { length: Math.ceil(children.length / columnCount) },
    (_, i) => i,
  );

  return (
    <div className="flex w-full flex-row">
      {cols.map((col) => (
        <div key={col} className="flex w-full flex-col">
          {rows.map((row) => {
            const child = children[row * columnCount + col];
            return child && cloneElement(child as React.ReactElement);
          })}
        </div>
      ))}
    </div>
  );
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
