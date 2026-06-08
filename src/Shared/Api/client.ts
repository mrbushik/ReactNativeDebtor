import axios, {
  AxiosHeaders,
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig,
} from "axios";
import { env } from "../Config/env";
import { apiRoutes } from "./routes";
import {
  clearAuthSession,
  getAccessToken,
  getAuthSession,
  getRefreshToken,
  saveAuthSession,
  type PersistedAuthSession,
} from "../../Store/storage/authSession";

export const apiClient = axios.create({
  baseURL: env.apiUrl || undefined,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const refreshClient = axios.create({
  baseURL: env.apiUrl || undefined,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

type RefreshResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type ApiClientAuthHandlers = {
  onRefreshSuccess?: (session: PersistedAuthSession) => void;
  onUnauthorized?: () => void;
};

let authHandlers: ApiClientAuthHandlers = {};
let refreshPromise: Promise<PersistedAuthSession | null> | null = null;

const setAuthorizationHeader = (
  headers: AxiosRequestHeaders | AxiosHeaders | undefined,
  token: string,
) => {
  const nextHeaders = AxiosHeaders.from(headers);
  nextHeaders.set("Authorization", `Bearer ${token}`);
  return nextHeaders;
};

const refreshAuthSession = async (): Promise<PersistedAuthSession | null> => {
  const refreshToken = getRefreshToken();
  const currentSession = getAuthSession();

  if (!refreshToken || !currentSession) {
    return null;
  }

  const { data } = await refreshClient.get<RefreshResponse>(apiRoutes.auth.refresh, {
    headers: {
      refreshToken,
    },
  });

  const nextSession: PersistedAuthSession = {
    accessToken: data.accessToken ?? data.token ?? null,
    refreshToken: data.refreshToken ?? refreshToken,
    user: currentSession.user,
  };

  if (!nextSession.accessToken) {
    return null;
  }

  await saveAuthSession(nextSession);
  authHandlers.onRefreshSuccess?.(nextSession);

  return nextSession;
};

export const setApiClientAuthHandlers = (handlers: ApiClientAuthHandlers) => {
  authHandlers = handlers;
};

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers = setAuthorizationHeader(config.headers, accessToken);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (
      !originalRequest ||
      status !== 401 ||
      originalRequest._retry ||
      originalRequest.url === apiRoutes.auth.refresh
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAuthSession().finally(() => {
        refreshPromise = null;
      });

      const nextSession = await refreshPromise;

      if (!nextSession?.accessToken) {
        throw error;
      }

      originalRequest.headers = setAuthorizationHeader(
        originalRequest.headers,
        nextSession.accessToken,
      );

      return apiClient(originalRequest);
    } catch (refreshError) {
      await clearAuthSession();
      authHandlers.onUnauthorized?.();
      return Promise.reject(refreshError);
    }
  },
);
