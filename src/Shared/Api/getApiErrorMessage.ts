import type { SerializedError } from "@reduxjs/toolkit";
import type { ApiError } from "./axiosBaseQuery";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isApiError = (error: ApiError | SerializedError): error is ApiError =>
  "status" in error && "data" in error;

export const getApiErrorMessage = (
  error: ApiError | SerializedError | undefined,
) => {
  if (!error) {
    return "Request failed.";
  }

  if (!isApiError(error)) {
    return typeof error.message === "string" ? error.message : "Request failed.";
  }

  if (typeof error.data === "string") {
    return error.data;
  }

  if (isRecord(error.data)) {
    const message = error.data.message;
    const details = error.data.error;

    if (typeof message === "string") {
      return message;
    }

    if (typeof details === "string") {
      return details;
    }
  }

  return "Request failed.";
};
