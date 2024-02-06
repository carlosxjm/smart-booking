import { formatDateToSave } from "./formatDateToSave";

export const addDays = (date, days) => {
  const newDate = new Date(date.split("-"));
  newDate.setDate(newDate.getDate() + days);

  return formatDateToSave(newDate);
};
