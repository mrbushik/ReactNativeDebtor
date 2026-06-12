import { baseApi } from "../../Shared/Api/baseApi";
import { apiRoutes } from "../../Shared/Api/routes";
import type { Debt } from "../../Shared/Types/Debt";

export type OverviewResponse = {
  activeDebts: Debt[];
  depositAmount: number;
  debtAmount: number;
  total: number;
};

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewResponse, string>({
      query: (userId) => ({
        url: `${apiRoutes.overview.get}/${userId}`,
        method: "GET",
      }),
      providesTags: ["Overview"],
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
