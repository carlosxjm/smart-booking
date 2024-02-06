import { isDateValid } from "./date";
import { formatDateToSave } from "./formatDateToSave";

export const getNextIntervalStartDate = (date, intervals) => {
  if (!isDateValid(date) || intervals.length === 0) {
    return null;
  }

  const arr = [...intervals].sort((intervalA, interValB) => {
    if (intervalA.start > interValB.start) {
      return 1;
    }

    if (intervalA.start < interValB.start) {
      return -1;
    }

    return 0;
  });

  const nextInterval = arr.find(
    (interval) => formatDateToSave(interval.start) > formatDateToSave(date)
  );

  return nextInterval?.start ?? null;
};
