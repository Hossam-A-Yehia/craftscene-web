import { NextApiResponse } from "next";

interface CustomError extends Error {
  status?: number;
}

export default function globalExceptionHandler(
  res: NextApiResponse,
  error: unknown
): void {
  console.error("Global Exception Handler:", error);

  if (error instanceof Error) {
    const customError = error as CustomError;
    const status = customError.status || 500;

    res.status(status).json({
      success: false,
      name: customError.name,
      message: customError.message,
    });
  } else {
    res.status(500).json({
      success: false,
      name: "UnknownError",
      message: "An unexpected error occurred",
    });
  }
}
