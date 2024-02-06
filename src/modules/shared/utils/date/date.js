export const isDateValid = (date) => (date ? !isNaN(new Date(date)) : false);
export const padSingleDigit = (value) =>
  value > 9 ? value.toString() : `0${value}`;
export const parseToDate = (date) => {
  if (!isDateValid(date)) {
    return null;
  }

  return new Date(date.split("-"));
};
