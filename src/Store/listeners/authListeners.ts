import { createListenerMiddleware } from "@reduxjs/toolkit";
import { clearAuthSession, saveAuthSession } from "../storage/authSession";
import { logout, setCredentials } from "../slices/authSlice";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: setCredentials,
  effect: async (action) => {
    await saveAuthSession({
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      user: action.payload.user,
    });
  },
});

authListenerMiddleware.startListening({
  actionCreator: logout,
  effect: async () => {
    await clearAuthSession();
  },
});
