import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorMessage = () => {
  return (
    <div
      data-testid="error-message-container"
      className="flex items-center justify-center space-x-3 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
    >
      <FaExclamationTriangle
        data-testid="error-message-icon"
        className="text-red-500 h-6 w-6"
      />
      <p data-testid="error-message-text" className="text-center text-sm">
        Failed to load
      </p>
    </div>
  );
};

export default ErrorMessage;
