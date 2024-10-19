import { cloneElement, useMemo, ReactNode } from "react";
import useWindowSize from "./hooks/useWindowSize";
import { getColumnCountMosaicList } from "./hooks/getColumnCountMosaicList";

interface MosaicListProps {
  children: ReactNode[];
  columns: { [breakpoint: string]: number };
}

export function MosaicList({ children, columns }: MosaicListProps) {
  const [screenWidth] = useWindowSize();

  // Memoize columnCount, cols, and rows to avoid recalculating on every render
  const columnCount = useMemo(
    () => getColumnCountMosaicList(screenWidth, columns),
    [screenWidth, columns],
  );
  const cols = useMemo(
    () => Array.from({ length: columnCount }, (_, i) => i),
    [columnCount],
  );
  const rows = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(children.length / columnCount) },
        (_, i) => i,
      ),
    [children.length, columnCount],
  );

  return (
    <div
      className="grid w-full gap-5"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {cols.map((col) => (
        <div key={col} className="space-y-5">
          {rows.map((row) => {
            const child = children[row * columnCount + col];
            return child && cloneElement(child as React.ReactElement);
          })}
        </div>
      ))}
    </div>
  );
}
