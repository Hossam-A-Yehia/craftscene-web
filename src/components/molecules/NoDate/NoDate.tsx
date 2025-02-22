import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const NoData = () => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 w-full"
      data-testid="no-data-container"
    >
      <FaExclamationCircle
        className="text-gray-400 text-4xl mb-4 animate-bounce"
        data-testid="no-data-icon"
      />
      <h2 className="text-2xl text-gray-700 font-bold mb-2 text-center">
        No Data Available
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        Oops! It looks like there's no data to display at the moment. Please
        check back later or try refreshing the page.
      </p>
    </div>
  );
};

export default NoData;
