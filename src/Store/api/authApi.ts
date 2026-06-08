import { baseApi } from "../../Shared/Api/baseApi";
import { apiRoutes } from "../../Shared/Api/routes";
import { setCredentials } from "../slices/authSlice";
import type { AuthUser } from "../types/auth";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        data: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setCredentials({
            accessToken: data.accessToken ?? data.token ?? null,
            refreshToken: data.refreshToken ?? null,
            user: data.user ?? null,
            isHydrated: true,
          }),
        );
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
