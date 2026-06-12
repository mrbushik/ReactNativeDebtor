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

export type AddDebtRequest = {
  lenderId: string;
  debtorName: string;
  debtorInfo?: string;
  debtAmount: number;
  refundAmount: number;
  debtDate?: string;
  dueDate?: string | null;
  withoutDetails: boolean;
  isReturned: boolean;
};

export const addDebtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDebt: builder.mutation<Debt, AddDebtRequest>({
      query: (body) => ({
        url: apiRoutes.debt.add,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Overview"],
    }),
  }),
});
export const { useAddDebtMutation } = addDebtApi;
