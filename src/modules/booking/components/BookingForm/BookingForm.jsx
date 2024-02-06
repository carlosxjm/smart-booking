import { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../shared/components/Button/Button";
import { addDays } from "../../../shared/utils/date/addDays";
import { parseToDate } from "../../../shared/utils/date/date";
import { formErrorMessages } from "./formErrorMessages";
import { DateRangePicker } from "../../../shared/components/DateRangePicker/DateRangePicker";
import "./BookingForm.css";

export const BookingForm = ({ booking, existingBookings, onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    booking && {
      defaultValues: {
        guestName: booking.guestName,
        contactNumber: booking.contactNumber,
        period: [parseToDate(booking.startDate), parseToDate(booking.endDate)],
      },
    }
  );

  const excludeDateIntervals = existingBookings.map(
    ({ startDate, endDate }) => ({
      start: startDate,
      end: startDate === endDate ? addDays(endDate, 1) : endDate,
    })
  );

  const DateRangePickerForwardRef = forwardRef((props, ref) => (
    <DateRangePicker
      {...props}
      innerRef={ref}
      excludeDateIntervals={excludeDateIntervals}
    />
  ));
  DateRangePickerForwardRef.displayName = "DatePicker";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="booking-form-root">
      <div className="form-input-wrapper">
        <label htmlFor="period">Period</label>
        <Controller
          name="period"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DateRangePickerForwardRef id="period" {...field} />
          )}
        />
        {errors.period && (
          <p className="error">
            {formErrorMessages.period[errors.period.type]}
          </p>
        )}
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="guestName">Guest name</label>
        <input
          id="guestName"
          type="text"
          {...register("guestName", { required: true })}
        />
        {errors.guestName && (
          <p className="error">
            {formErrorMessages.guestName[errors.guestName.type]}
          </p>
        )}
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="contactNumber">Contact number</label>
        <input
          id="contactNumber"
          type="text"
          {...register("contactNumber", {
            pattern: /^[0-9]*$/,
            minLength: 10,
            maxLength: 10,
            required: true,
          })}
        />
        {errors.contactNumber && (
          <p className="error">
            {formErrorMessages.contactNumber[errors.contactNumber.type]}
          </p>
        )}
      </div>

      <Button>Reserve</Button>
    </form>
  );
};
