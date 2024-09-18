import React from "react";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Enable timezone and UTC support in dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

// Function to detect the user's timezone
const userTimeZone = dayjs.tz.guess();

export default function CustomDatePicker({
  error,
  errorCondition,
  control,
  name,
  className,
  onChange,
  selectedDate,
  showTimePicker = false, // Toggle date and time picker
}: any) {
  const [value, setValue] =  React.useState<Dayjs | null>(
    selectedDate ? dayjs(selectedDate).tz(userTimeZone) : dayjs().tz(userTimeZone) // Initialize with the selected date or current date
  );

  // Calculate the first and last day of the current month
  // const currentMonthStart = dayjs().startOf("month");
  const currentMonthEnd = dayjs().endOf("month");
  // const yesterday = dayjs().subtract(1,'day');
  const tomorrow = dayjs().add(1, "day");
  const nextSunday = dayjs().endOf("week").startOf("day");

  const isWeekend = (date: Dayjs) => {
    const dayOfWeek = date.day(); // Day of the week (0-6)
    const dayOfMonth = date.date(); // Day of the month (1-31)
    return dayOfWeek === 0 || dayOfWeek === 6 || dayOfMonth === 24;
  };
  const shouldDisableTime: TimePickerProps<Dayjs>["shouldDisableTime"] = (
    value,
    view
  ) =>
    view === "hours" &&
    ((value.hour() >= 1 && value.hour() <= 2) || // Disable 1 to 2
      (value.hour() >= 4 && value.hour() <= 5) || // Disable 3 to 5
      (value.hour() >= 15 && value.hour() <= 17)); // Disable 14 to 17 (2 PM to 5 PM)

  React.useEffect(() => {
    if (selectedDate) {
      setValue(dayjs(selectedDate).tz(userTimeZone));
    }
  }, [selectedDate]);

  return (
    <Grid>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              {...field}
              className={className}
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  error: error,
                },
              }}
              value={value}
              onChange={(date: Dayjs | null) => {
                const localizedDate = date ? date.tz(userTimeZone) : null;
                field.onChange(localizedDate?.toDate() || null);
                if (onChange) {
                  onChange(localizedDate?.toDate() || null);
                }
              }}
              views={
                showTimePicker
                  ? ["year", "month", "day", "hours", "minutes"]
                  : ["year", "month", "day"]
              }
              // defaultValue={yesterday}
              // disablePast
              defaultValue={nextSunday}
              shouldDisableDate={isWeekend}
              shouldDisableTime={shouldDisableTime}
              minDate={tomorrow} // Only allow dates from current month
              maxDate={currentMonthEnd} // Restrict to the current month's end
            />
          </LocalizationProvider>
        )}
      />
      {errorCondition}
    </Grid>
  );
}
