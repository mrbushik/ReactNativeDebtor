import { formatDate, parseDate } from "./date";

describe("date helpers", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(formatDate(new Date(2026, 5, 9))).toBe("2026-06-09");
  });

  it("parses a YYYY-MM-DD value as a local date", () => {
    const date = parseDate("2026-06-09");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(9);
  });
});
