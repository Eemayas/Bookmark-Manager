import { useLayoutEffect, useState, useRef, useEffect, ReactNode } from "react";

interface MosaicListProps {
  children: ReactNode[];
  itemWidth: number;
}

function App() {
  return (
    <MosaicList itemWidth={200}>
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

function MosaicList({ children, itemWidth }: MosaicListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenWidth] = useWindowSize();
  const columnCount = screenWidth ? Math.floor(screenWidth / itemWidth) : 1;

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const items = Array.from(container.children) as HTMLElement[];
      const columns: number[] = Array(columnCount).fill(0);

      items.forEach((item, index) => {
        const columnIndex = index % columnCount;
        const top = columns[columnIndex];
        item.style.position = "absolute";
        item.style.top = `${top}px`;
        item.style.left = `${columnIndex * itemWidth}px`;
        columns[columnIndex] += item.clientHeight + 16; // Add margin
      });

      container.style.position = "relative";
      container.style.height = `${Math.max(...columns)}px`;
    }
  }, [children, columnCount, itemWidth]);

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
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
