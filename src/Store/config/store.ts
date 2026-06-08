import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "../../Shared/Api/baseApi";
import { setApiClientAuthHandlers } from "../../Shared/Api/client";
import { authListenerMiddleware } from "../listeners/authListeners";
import authReducer, { logout, setCredentials } from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authListenerMiddleware.middleware,
      baseApi.middleware,
    ),
});

setupListeners(store.dispatch);

setApiClientAuthHandlers({
  onRefreshSuccess: (session) => {
    store.dispatch(
      setCredentials({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        user: session.user,
        isHydrated: true,
      }),
    );
  },
  onUnauthorized: () => {
    store.dispatch(logout());
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
