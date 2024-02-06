import { describe, it, expect, vi } from "vitest";

import { formatDateToSave } from "./formatDateToSave";
import { isDateValid } from "./date";

vi.mock("./date", async () => ({
  ...(await vi.importActual("./date")),
  isDateValid: vi.fn(),
}));

describe("formatDateToSave", () => {
  it("returns null for an invalid date", () => {
    isDateValid.mockReturnValueOnce(false);
    expect(formatDateToSave("invalid-date")).toBe(null);
  });

  it("returns the correctly formatted date for a valid date", () => {
    isDateValid.mockReturnValueOnce(true);
    expect(formatDateToSave("01/02/2023")).toBe("2023-01-02");
  });
});
