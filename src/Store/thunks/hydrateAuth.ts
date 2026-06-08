import type { AppDispatch } from "../config/store";
import { setCredentials, setHydrated } from "../slices/authSlice";
import { loadAuthSession } from "../storage/authSession";

export const hydrateAuth = () => async (dispatch: AppDispatch) => {
  try {
    const session = await loadAuthSession();

    if (!session) {
      dispatch(setHydrated(true));
      return;
    }

    dispatch(
      setCredentials({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        user: session.user,
        isHydrated: true,
      }),
    );
  } catch {
    dispatch(setHydrated(true));
  }
};
