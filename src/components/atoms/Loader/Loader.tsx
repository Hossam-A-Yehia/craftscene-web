import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div
      className="flex flex-col items-center justify-center space-y-4 p-4"
      data-testid="loader-container"
    >
      <FaSpinner
        className="animate-spin text-gray-500 h-8 w-8"
        data-testid="loader-spinner"
      />
      <p className="text-gray-500 text-lg" data-testid="loader-text">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
