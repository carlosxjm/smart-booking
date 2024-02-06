import { describe, it, expect } from "vitest";
import { isDateValid, padSingleDigit, parseToDate } from "./date";

describe("isDateValid", () => {
  it("returns true for a valid date", () => {
    expect(isDateValid("2022-01-01")).toBe(true);
  });

  it("returns false for an invalid date", () => {
    expect(isDateValid("invalid-date")).toBe(false);
  });

  it("returns false for null input", () => {
    expect(isDateValid(null)).toBe(false);
  });
});

describe("padSingleDigit", () => {
  it("pads single digit with zero", () => {
    expect(padSingleDigit(3)).toBe("03");
  });

  it("does not pad double digit", () => {
    expect(padSingleDigit(12)).toBe("12");
  });
});

describe("parseToDate", () => {
  it("returns a Date object for a valid date", () => {
    expect(parseToDate("2022-01-01")).toBeInstanceOf(Date);
  });

  it("returns null for an invalid date", () => {
    expect(parseToDate("invalid-date")).toBe(null);
  });

  it("returns null for null input", () => {
    expect(parseToDate(null)).toBe(null);
  });
});
