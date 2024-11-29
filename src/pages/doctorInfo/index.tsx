import React from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const DoctorInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/doctorProfile");
        const doctorData = response.data.doctors.find(
          (doc: any) => doc.userId?._id === id
        );

        if (doctorData) {
          setDoctor(doctorData);
        } else {
          setError("Doctor not found.");
        }
      } catch (err) {
        setError("Failed to fetch doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  // Render Loading State
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render Error State
  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  // Render Doctor Information
  if (!doctor) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography color="text.secondary" variant="h6">
          Doctor not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* Image Section */}
        <Grid item xs={12} sm={4}>
          <img
            src={doctor.imageUrl}
            alt={doctor.title || "Doctor"}
            style={{
              width: "100%",
              borderRadius: 8,
              objectFit: "cover",
              maxHeight: 300,
            }}
          />
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Name: {doctor.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Qualification: {doctor.qualification}
          </Typography>

          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {doctor.exploredescription}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="bold"
            >
              Consultation Charges: {doctor.charges}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorInfo;
