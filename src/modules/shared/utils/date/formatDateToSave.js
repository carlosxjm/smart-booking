import { isDateValid, padSingleDigit } from "./date";

export const formatDateToSave = (date) => {
  if (!isDateValid(date)) {
    return null;
  }

  const _date = new Date(date);

  const year = _date.getFullYear();
  const month = padSingleDigit(_date.getMonth() + 1);
  const day = padSingleDigit(_date.getDate());

  return `${year}-${month}-${day}`;
};
