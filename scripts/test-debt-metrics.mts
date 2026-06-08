import assert from "node:assert/strict";
import {
  getDebtAnnualPercentageText,
  getDebtAnnualPercentageValue,
  getDebtRevenueText,
  getDebtRevenueValue,
} from "../src/entities/DebtMetrics/DebtMetrics.js";

const debt = {
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

assert.equal(getDebtRevenueValue(debt), 20);
assert.equal(getDebtRevenueText(debt), "20.00");
assert.equal(getDebtAnnualPercentageValue(debt), 70.19);
assert.equal(getDebtAnnualPercentageText(debt), "70.19%");

assert.equal(
  getDebtAnnualPercentageText({
    ...debt,
    dueDate: null,
  }),
  "N/A",
);

assert.equal(
  getDebtAnnualPercentageText({
    ...debt,
    debtAmount: 0,
  }),
  "N/A",
);

console.log("Debt metrics tests passed");
