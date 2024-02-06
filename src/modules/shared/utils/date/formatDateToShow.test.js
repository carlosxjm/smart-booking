import { describe, it, expect, vi } from "vitest";
import { formatDateToShow } from "./formatDateToShow";
import { isDateValid } from "./date";

vi.mock("./date", async () => ({
  ...(await vi.importActual("./date")),
  isDateValid: vi.fn(),
}));

describe("formatDateToShow", () => {
  it("returns null for an invalid date", () => {
    isDateValid.mockReturnValueOnce(false);
    expect(formatDateToShow("invalid-date")).toBe(null);
  });

  it("returns the correctly formatted date for a valid date", () => {
    isDateValid.mockReturnValueOnce(true);
    const date = "2022-01-01";
    const expected = "01/01/2022";
    expect(formatDateToShow(date)).toBe(expected);
  });
});
