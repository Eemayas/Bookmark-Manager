import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([0, 0]); // Initialize with default values

  useEffect(() => {
    // Set size only after the component mounts
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    // Set initial size
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);
    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
