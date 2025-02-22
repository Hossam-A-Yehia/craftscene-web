"use client";

import Text from "@/components/atoms/Text/Text";
import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    setMessage(error.message);
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        <FaExclamationTriangle className="mx-auto text-red-500 text-6xl mb-6" />
        <Text className="text-2xl font-bold text-red-600 mb-4">
          Something Went Wrong
        </Text>
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <button
          onClick={reset}
          className="bg-red-600 text-white py-2 px-8 rounded-full text-lg font-medium hover:bg-red-700 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
