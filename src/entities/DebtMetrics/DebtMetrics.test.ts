import type { Debt } from "../../Shared/Types/Debt";
import {
  getDebtAnnualPercentageText,
  getDebtAnnualPercentageValue,
  getDebtRevenueText,
  getDebtRevenueValue,
} from "./DebtMetrics";

const debt: Debt = {
  _id: "1",
  debtAmount: 800,
  debtDate: "2026-02-26",
  debtorInfo: "",
  debtorName: "Pasha",
  dueDate: "2026-03-11",
  isReturned: false,
  lenderId: "lender",
  refundAmount: 820,
  withoutDetails: false,
  __v: 0,
};

describe("DebtMetrics", () => {
  it("calculates debt revenue", () => {
    expect(getDebtRevenueValue(debt)).toBe(20);
    expect(getDebtRevenueText(debt)).toBe("20.00");
  });

  it("calculates annual percentage", () => {
    expect(getDebtAnnualPercentageValue(debt)).toBe(70.19);
    expect(getDebtAnnualPercentageText(debt)).toBe("70.19%");
  });

  it("returns N/A when percentage cannot be calculated", () => {
    expect(getDebtAnnualPercentageText({ ...debt, dueDate: null })).toBe("N/A");
    expect(getDebtAnnualPercentageText({ ...debt, debtAmount: 0 })).toBe("N/A");
  });
});
