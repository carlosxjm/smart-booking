import { describe, it, expect } from "vitest";
import { getNextIntervalStartDate } from "./getNextIntervalStartDate";

describe("getNextIntervalStartDate", () => {
  const intervals = [
    { start: "2022-01-01" },
    { start: "2022-02-01" },
    { start: "2022-02-03" },
    { start: "2022-02-02" },
    { start: "2022-02-03" },
    { start: "2022-02-05" },
    { start: "2022-03-01" },
  ];

  it("returns null when date is not valid", () => {
    const date = "invalid-date";
    const result = getNextIntervalStartDate(date, intervals);
    expect(result).toBe(null);
  });

  it("returns null when intervals array is empty", () => {
    const date = "2022-01-01";
    const emptyIntervals = [];
    const result = getNextIntervalStartDate(date, emptyIntervals);
    expect(result).toBe(null);
  });

  it("returns null when there is no next interval after the given date", () => {
    const date = "2022-04-01";
    const result = getNextIntervalStartDate(date, intervals);
    expect(result).toBe(null);
  });

  it("returns the start date of the next interval after the given date", () => {
    const date = "2022-01-15";
    const result = getNextIntervalStartDate(date, intervals);
    expect(result).toBe("2022-02-01");
  });

  it("returns the start date of the next interval when date is equal to the start of an interval", () => {
    const date = "2022-02-01";
    const result = getNextIntervalStartDate(date, intervals);
    expect(result).toBe("2022-02-02");
  });

  it("returns the start date of the last interval when date falls within the last interval", () => {
    const date = "2022-02-15";
    const result = getNextIntervalStartDate(date, intervals);
    expect(result).toBe("2022-03-01");
  });
});
