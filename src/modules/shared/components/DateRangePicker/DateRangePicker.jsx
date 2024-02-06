import "react-datepicker/dist/react-datepicker.min.css";
import DatePicker from "react-datepicker";
import { getNextIntervalStartDate } from "../../utils/date/getNextIntervalStartDate";
import { formatDateToSave } from "../../utils/date/formatDateToSave";

export const DateRangePicker = ({
  id,
  name,
  value,
  onChange,
  excludeDateIntervals,
}) => {
  const handleBlur = () => {
    if (value && !value[1]) {
      onChange([]);
    }
  };

  const getMaxDate = () => {
    const startDate = value && !value[1] ? value[0] : null;
    if (!startDate) {
      return null;
    }

    return getNextIntervalStartDate(startDate, excludeDateIntervals);
  };

  const startDate = value && value[0];
  const endDate = value && value[1];
  const minDate =
    startDate && !endDate ? startDate : formatDateToSave(new Date());

  return (
    <DatePicker
      id={id}
      value={value}
      name={name}
      placeholderText="Select the period"
      autoComplete="off"
      onChange={onChange}
      onBlur={() => handleBlur()}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      maxDate={getMaxDate()}
      excludeDateIntervals={excludeDateIntervals}
      selectsRange
    />
  );
};
