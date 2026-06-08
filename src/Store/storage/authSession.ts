import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { AuthState } from "../types/auth";

const AUTH_SESSION_KEY = "auth_session";

let authSession: PersistedAuthSession | null = null;

export type PersistedAuthSession = Pick<
  AuthState,
  "accessToken" | "refreshToken" | "user"
>;

export const getAuthSession = () => authSession;

export const getAccessToken = () => authSession?.accessToken ?? null;

export const getRefreshToken = () => authSession?.refreshToken ?? null;

export const setAuthSession = (session: PersistedAuthSession | null) => {
  authSession = session;
};

const isWeb = Platform.OS === "web";

const saveToStorage = async (value: string) => {
  if (isWeb) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(AUTH_SESSION_KEY, value);
    }
    return;
  }

  await SecureStore.setItemAsync(AUTH_SESSION_KEY, value);
};

const loadFromStorage = async () => {
  if (isWeb) {
    if (typeof localStorage === "undefined") {
      return null;
    }

    return localStorage.getItem(AUTH_SESSION_KEY);
  }

  return SecureStore.getItemAsync(AUTH_SESSION_KEY);
};

const clearFromStorage = async () => {
  if (isWeb) {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
};

export const saveAuthSession = async (session: PersistedAuthSession) => {
  setAuthSession(session);

  try {
    await saveToStorage(JSON.stringify(session));
  } catch {
    // Keep in-memory token available even if persistent storage is unavailable.
  }
};

export const loadAuthSession = async (): Promise<PersistedAuthSession | null> => {
  try {
    const rawSession = await loadFromStorage();

    if (!rawSession) {
      setAuthSession(null);
      return null;
    }

    const session = JSON.parse(rawSession) as PersistedAuthSession;
    setAuthSession(session);

    return session;
  } catch {
    setAuthSession(null);
    return null;
  }
};

export const clearAuthSession = async () => {
  setAuthSession(null);

  try {
    await clearFromStorage();
  } catch {
    // No-op when secure storage is unavailable.
  }
};
