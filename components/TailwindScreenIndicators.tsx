import React from "react";

const TailwindScreenIndicators = () => {
  return (
    <div className="bg-red fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
      <span className="xs:hidden block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </div>
  );
};

export default TailwindScreenIndicators;
