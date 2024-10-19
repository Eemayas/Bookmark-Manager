export function getColumnCountMosaicList(
  screenWidth: number,
  columns: { [breakpoint: string]: number },
): number {
  const tailwindBreakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  let columnCount = 1;
  for (const [bp, value] of Object.entries(columns)) {
    const breakpointValue =
      tailwindBreakpoints[bp as keyof typeof tailwindBreakpoints] || Number(bp);
    if (screenWidth >= breakpointValue) {
      columnCount = value;
    }
  }

  return columnCount;
}
