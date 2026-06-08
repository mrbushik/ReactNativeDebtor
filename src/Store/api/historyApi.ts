import { baseApi } from "../../Shared/Api/baseApi";
import { apiRoutes } from "../../Shared/Api/routes";
import type { Debt } from "../../Shared/Types/Debt";

type GetHistoryParams = {
  userId: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const historyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query<Debt[], GetHistoryParams>({
      query: ({ userId, sortBy, order }) => ({
        url: `${apiRoutes.history.get}/${userId}`,
        method: "GET",
        params: {
          sortBy,
          order,
        },
      }),
    }),
  }),
});

export const { useGetHistoryQuery } = historyApi;
