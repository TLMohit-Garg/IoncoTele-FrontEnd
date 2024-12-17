import React, { useState } from "react";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectDoctorUserId } from "../../store/authDoctorSlice";
import { Button, Grid, TextField, Typography } from "@mui/material";
import styles from "/src/Styles/setAvailability.module.css";
import IconLabelButtons from "../CustomButton/Button";


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

        setAvailability((prev: any) => [...prev, newSlot]);
        setSuccessMessage("Availability added successfully!");
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to add availability. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid className={styles.parentGrid}>
          <Typography className={styles.typo}>Set Your Availability</Typography>
          <Grid container item mt={3} lg={10} md={10} sm={10} justifyContent={"left"} className={styles.inputDatepicker}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          <Grid container item mt={3} lg={10} md={10} sm={10} justifyContent={"left"} className={styles.inputDatepicker}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          <Grid container item mt={3} lg={10} md={10} sm={10} justifyContent={"left"} className={styles.inputDatepicker}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          <Grid container item mt={3} lg={10} md={10} sm={10} justifyContent={"left"} className={styles.inputDatepicker}>
            {/* <button onClick={addAvailability} disabled={loading}>
          {loading ? "Saving..." : "Add Availability"}
        </button> */}
            <IconLabelButtons
              name={"Add Availability"}
              variant={"contained"}
              className={styles.IconLabelButtons}
              onClick={addAvailability}
            />
          </Grid>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green", paddingLeft: "5px" }}>{successMessage}</p>}

          <Grid container item mt={5} spacing={2}>
            <Grid item xs={12}>
              <Typography className={styles.typo}>Your Availability</Typography>
            </Grid>
            {availability.map((slot: any, index) => (
              <Grid key={index} item lg={6} md={6} sm={6} xs={12}>
                <Typography>
                  Date: {slot.date}
                  <br />
                  Time: {slot.startTime} - {slot.endTime}
                  <br />
                  Timezone: {slot.timezone}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

export default DoctorAvailability;
