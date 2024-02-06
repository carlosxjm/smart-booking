import { describe, expect, it, vi } from "vitest";
import { addDays } from "./addDays";

describe("addDays", () => {
  it.each`
    inputDate       | daysToAdd | expectedDate
    ${"2024-02-05"} | ${5}      | ${"2024-02-10"}
    ${"2024-02-10"} | ${-3}     | ${"2024-02-07"}
    ${"2024-02-15"} | ${0}      | ${"2024-02-15"}
    ${"2024-02-30"} | ${10}     | ${"2024-03-11"}
  `(
    "adds $daysToAdd days to $inputDate",
    ({ inputDate, daysToAdd, expectedDate }) => {
      const result = addDays(inputDate, daysToAdd);

      expect(result).toBe(expectedDate);
    }
  );
});
