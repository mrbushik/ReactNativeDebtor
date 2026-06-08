import type { Debt } from "../../Shared/Types/Debt";

const MS_IN_DAY = 24 * 60 * 60 * 1000;

const roundToTwoDecimals = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const parseDateOnly = (value?: string | null) => {
  if (!value?.trim()) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const getDebtDurationInDays = (debtDate: string, dueDate?: string | null) => {
  const startDate = parseDateOnly(debtDate);
  const endDate = parseDateOnly(dueDate);

  if (!startDate || !endDate) {
    return null;
  }

  const diffInDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / MS_IN_DAY,
  );

  return diffInDays > 0 ? diffInDays : null;
};

export const getDebtRevenueValue = (
  debt: Pick<Debt, "debtAmount" | "refundAmount">,
) => roundToTwoDecimals(Number(debt.refundAmount) - Number(debt.debtAmount));

export const getDebtRevenueText = (
  debt: Pick<Debt, "debtAmount" | "refundAmount">,
) => getDebtRevenueValue(debt).toFixed(2);

export const getDebtAnnualPercentageValue = (
  debt: Pick<Debt, "debtAmount" | "refundAmount" | "debtDate" | "dueDate">,
) => {
  const principal = Number(debt.debtAmount);
  const revenue = getDebtRevenueValue(debt);
  const durationInDays = getDebtDurationInDays(debt.debtDate, debt.dueDate);

  if (principal <= 0 || revenue < 0 || !durationInDays) {
    return null;
  }

  const annualPercentage = (revenue / principal) * (365 / durationInDays) * 100;

  return roundToTwoDecimals(annualPercentage);
};

export const getDebtAnnualPercentageText = (
  debt: Pick<Debt, "debtAmount" | "refundAmount" | "debtDate" | "dueDate">,
) => {
  const annualPercentage = getDebtAnnualPercentageValue(debt);

  if (annualPercentage === null) {
    return "N/A";
  }

  return `${annualPercentage.toFixed(2)}%`;
};
