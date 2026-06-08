import { baseApi } from "../../Shared/Api/baseApi";
import { apiRoutes } from "../../Shared/Api/routes";
import type { Debt } from "../../Shared/Types/Debt";

export const getDebtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDebt: builder.query<Debt, string>({
      query: (debtId) => ({
        url: `${apiRoutes.debt.get}/${debtId}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetDebtQuery } = getDebtApi;
