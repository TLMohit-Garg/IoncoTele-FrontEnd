import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import data from "../doctors/data.json";

type DoctorInfoProps = {
  imageUrl?: string;
  name?: string;
};

const DoctorInfo: React.FC<DoctorInfoProps> = ({ imageUrl, name }) => {
  const { id } = useParams<{ id: string }>();
  const doctor = data.find((doc) => doc.id === Number(id)); // Find doctor by ID

  if (!doctor) return <Typography>Doctor not found</Typography>;

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
            alt={name}
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
            Name:{doctor.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Qualification:{doctor.qualification}
          </Typography>

          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {doctor.description}
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
