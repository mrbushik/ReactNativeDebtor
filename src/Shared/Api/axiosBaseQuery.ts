import type { AxiosError, AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { apiClient } from "./client";
import { ensureApiUrl } from "../Config/env";

type RequestArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export type ApiError = {
  status: number | string;
  data: unknown;
};

export const axiosBaseQuery =
  (): BaseQueryFn<RequestArgs, unknown, ApiError> =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      ensureApiUrl();

      const result = await apiClient({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;

      return {
        error: {
          status: axiosError.response?.status ?? "REQUEST_ERROR",
          data: axiosError.response?.data ?? axiosError.message,
        },
      };
    }
  };
