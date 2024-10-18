import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const GenerateVideoCallLink: React.FC = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [consultationTime, setConsultationTime] = useState('');
  const [videoCallLink, setVideoCallLink] = useState('');

  const handleGenerateLink = async () => {
    if (!patientId || !doctorId || !consultationTime) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Call your backend API to generate a video call link (Jitsi, Twilio, etc.)
      const response = await axios.post('/api/videoCallDetail/generateVideoCallLink', {
        patientId,
        doctorId,
        consultationTime,
      });

      // Assuming response contains the video call link
      setVideoCallLink(response.data.link);
    } catch (error) {
      console.error('Error generating video call link:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Consultation Time"
          type="datetime-local"
          value={consultationTime}
          onChange={(e) => setConsultationTime(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleGenerateLink}>
          Generate Video Call Link
        </Button>
      </Grid>
      {videoCallLink && (
        <Grid item xs={12}>
          <p>Generated Video Call Link: <a href={videoCallLink} target="_blank" rel="noopener noreferrer">{videoCallLink}</a></p>
        </Grid>
      )}
    </Grid>
  );
};

export default GenerateVideoCallLink;
