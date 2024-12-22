import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectPatientUserId, selectPatientToken } from "../../store/authPatientSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

function PatientUpdateProfile() {
  const token = useSelector(selectPatientToken);
  const userId = useSelector(selectPatientUserId);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      userId,
      fullName,
      address,
    };

    try {
      const response = await axios.post("/api/patientProfile/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Patient profile updated:", response.data);
    } catch (error) {
      console.error("Error updating patient profile:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4">Update Patient Profile</Typography>
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default PatientUpdateProfile;
