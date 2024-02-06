import { isDateValid, padSingleDigit } from "./date";

export const formatDateToShow = (date) => {
  if (!isDateValid(date)) {
    return null;
  }

  const _date = new Date(date.split("-"));

  const year = _date.getFullYear();
  const month = padSingleDigit(_date.getMonth() + 1);
  const day = padSingleDigit(_date.getDate());

  return `${month}/${day}/${year}`;
};
