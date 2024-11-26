import React, { useState } from "react";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectDoctorUserId } from "../../store/authDoctorSlice";

dayjs.extend(utc);
dayjs.extend(timezone);

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState<
    { date: Dayjs; startTime: Dayjs; endTime: Dayjs }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  // To get the local Time Zone 
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const doctorId = useSelector(selectDoctorUserId); 

  const addAvailability = async () => {
    if (selectedDate && startTime && endTime) {
      const newSlot = {
        doctorId,
        date: selectedDate.format("YYYY-MM-DD"),
        startTime: startTime.format("HH:mm"),
        endTime: endTime.format("HH:mm"),
        timezone: userTimeZone,
      };

      try {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Post request to save availability
        const response = await axios.post("/api/availability", newSlot);

        setAvailability((prev:any) => [...prev, newSlot]);
        setSuccessMessage("Availability added successfully!");
      } catch (err:any) {
        setError(
          err.response?.data?.message || "Failed to add availability. Please try again."
        );
      } finally {
        setLoading(false);
      }
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
        <button onClick={addAvailability} disabled={loading}>
          {loading ? "Saving..." : "Add Availability"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <div>
          <h3>Your Availability</h3>
          {availability.map((slot:any, index) => (
            <div key={index}>
              <p>
                Date: {slot.date}
                <br />
                Time: {slot.startTime} - {slot.endTime}
                <br />
                Timezone: {slot.timezone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DoctorAvailability;
