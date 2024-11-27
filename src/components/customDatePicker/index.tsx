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
import axios from "axios";
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
  doctorId,
}: any) {
  const [value, setValue] = React.useState<Dayjs | null>(
    selectedDate
      ? dayjs(selectedDate).tz(userTimeZone)
      : dayjs().tz(userTimeZone) // Initialize with the selected date or current date
  );
  const [availableDates, setAvailableDates] = React.useState<
  { date: string; startTime: string; endTime: string }[]
>([]);


const parseAvailability = (availability: any[]) => {
  return availability.map(item => ({
    date: item.date,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
};

  // Fetch availability data when the component mounts
  React.useEffect(() => {
    if (doctorId) {
      console.log("Doctor ID from the parent props:", doctorId);
      axios
        .get(`/api/availability/${doctorId}`)
        .then((response) => {
          console.log("response api from custom date picker", response.data.availability);
          const parsedData = parseAvailability(response.data.availability);
          console.log("Parsed Availability Data:", parsedData);
          setAvailableDates(parsedData);
        })
        .catch((error) => {
          console.error("Failed to fetch availability:", error);
        });
    }
  }, [doctorId]);

  // Function to check if the date is available
  const isDateAvailable = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD"); // Format date for comparison
    return availableDates.some((availability) => availability.date === formattedDate);
  };

  // Function to Check if a time is available for a selected date
  const isTimeAvailable = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const selectedTime = date.format("HH:mm");
    const availability = availableDates.find((a) => a.date === formattedDate);

    if (!availability) return false;

    const { startTime, endTime } = availability;
    return selectedTime >= startTime && selectedTime <= endTime;
  };

  // Disable dates
  const shouldDisableDate = (date: Dayjs) => !isDateAvailable(date);

  // Disable times
  const shouldDisableTime: TimePickerProps<Dayjs>["shouldDisableTime"] = (
    time,
    view
  ) => {
    if (view === "hours" || view === "minutes") {
      return !isTimeAvailable(time);
    }
    return false;
  };
  
  // Calculate the first and last day of the current month
  // const currentMonthStart = dayjs().startOf("month");
  const currentMonthEnd = dayjs().endOf("month");
  // const yesterday = dayjs().subtract(1,'day');
  const tomorrow = dayjs().add(1, "day");
  const nextSunday = dayjs().endOf("week").startOf("day");

  // Calculate the range for the next three months
  const threeMonthsFromToday = dayjs().add(3, "months").endOf("month");

  const isWeekend = (date: Dayjs) => {
    const dayOfWeek = date.day(); // Day of the week (0-6)
    // const dayOfMonth = date.date(); // Day of the month (1-31)
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // Logic to disable the next two days (48 hours)
  const isNextTwoDays = (date: Dayjs) => {
    const now = dayjs();
    return date.isAfter(now) && date.isBefore(now.add(3, "day").startOf("day"));
  };

  // Combined logic to disable dates
  const isWeekendOrOutOfRangeOrNextTwoDays = (date: Dayjs) => {
    return (
      isWeekend(date) || // Disable weekends
      isNextTwoDays(date) || // Disable the next 48 hours
      !date.isBetween(dayjs(), threeMonthsFromToday, "day", "[]") // Restrict to next three months
    );
  };

  // const shouldDisableTime: TimePickerProps<Dayjs>["shouldDisableTime"] = (
  //   value,
  //   view
  // ) =>
  //   view === "hours" &&  !isTimeAvailable(value);
    // ((value.hour() >= 1 && value.hour() <= 2) || // Disable 1 to 2
    //   (value.hour() >= 4 && value.hour() <= 5) || // Disable 3 to 5
    //   (value.hour() >= 15 && value.hour() <= 17)); // Disable 14 to 17 (2 PM to 5 PM)


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
              // shouldDisableDate={isWeekend}
              shouldDisableTime={shouldDisableTime}
              // minDate={tomorrow} // Only allow dates from current month
              // maxDate={currentMonthEnd} // Restrict to the current month's end

              shouldDisableDate={isWeekendOrOutOfRangeOrNextTwoDays} // Disable dates logic
              minDate={dayjs()} // Minimum date is today
              maxDate={threeMonthsFromToday} // Maximum date is three months from today
            />
          </LocalizationProvider>
        )}
      />
      {errorCondition}
    </Grid>
  );
}
