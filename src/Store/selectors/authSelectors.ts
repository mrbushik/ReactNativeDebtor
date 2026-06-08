import type { RootState } from "../config/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) =>
  state.auth.refreshToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthHydrated = (state: RootState) =>
  state.auth.isHydrated;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken);
