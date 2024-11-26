import React, { useState } from "react";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState<
    { date: Dayjs; startTime: Dayjs; endTime: Dayjs }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const addAvailability = () => {
    if (selectedDate && startTime && endTime) {
      setAvailability((prev) => [
        ...prev,
        {
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
        },
      ]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h2>Set Your Availability</h2>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
        />
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
        />
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={(newValue) => setEndTime(newValue)}
        />
        <button onClick={addAvailability}>Add Availability</button>

        <div>
          <h3>Your Availability</h3>
          {availability.map((slot, index) => (
            <div key={index}>
              <p>
                Date: {slot.date.format("YYYY-MM-DD")}
                <br />
                Time: {slot.startTime.format("HH:mm")} - {slot.endTime.format("HH:mm")}
                <br />
                Timezone: {userTimeZone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DoctorAvailability;
