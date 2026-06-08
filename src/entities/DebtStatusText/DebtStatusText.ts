const MS_IN_DAY = 24 * 60 * 60 * 1000;

const parseDateOnly = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

export const getDebtStatusText = (dueDate?: string | null | undefined) => {
  if (!dueDate?.trim()) {
    return "No due date";
  }

  const parsedDueDate = parseDateOnly(dueDate);

  if (!parsedDueDate) {
    return "No due date";
  }

  const today = new Date();
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diffInDays = Math.ceil(
    (parsedDueDate.getTime() - currentDate.getTime()) / MS_IN_DAY,
  );
  const absoluteDays = Math.abs(diffInDays);
  const dayLabel = absoluteDays === 1 ? "day" : "days";

  if (diffInDays >= 0) {
    return `Refund via ${absoluteDays} ${dayLabel}`;
  }

  return `Expired on ${absoluteDays} ${dayLabel}`;
};
