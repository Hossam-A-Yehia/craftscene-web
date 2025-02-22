export const handleAxiosError = (error: unknown): never => {
  if (error instanceof Error && "response" in error) {
    const axiosError = error as any;
    const errorMessage =
      axiosError.response?.data?.message || "An error occurred";
    console.error(errorMessage);
    throw errorMessage;
  } else {
    console.error("Unexpected error:", error);
    throw "Unexpected error occurred.";
  }
};
