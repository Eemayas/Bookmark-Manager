import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function updateSize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize([window.innerWidth, window.innerHeight]);
      }, 100); // Debounce time of 100ms
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return size;
};

export default useWindowSize;
