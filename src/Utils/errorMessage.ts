import axios from "axios";

type ApiErrorResponse = {
  message?: string;
};

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return (
      (err.response?.data as ApiErrorResponse)?.message ||
      "Server error occurred"
    );
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Something went wrong";
};