// import React from "react";
// import { Grid, Typography, Box, CircularProgress } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const DoctorInfo: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [doctor, setDoctor] = React.useState<any>(null);
//   const [loading, setLoading] = React.useState<boolean>(true);
//   const [error, setError] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     const fetchDoctorData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("/api/doctorProfile");
//         const doctorData = response.data.doctors.find(
//           (doc: any) => doc.userId?._id === id
//         );

//         if (doctorData) {
//           setDoctor(doctorData);
//         } else {
//           setError("Doctor not found.");
//         }
//       } catch (err) {
//         setError("Failed to fetch doctor details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctorData();
//   }, [id]);

//   // Render Loading State
//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Render Error State
//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", padding: 2 }}>
//         <Typography color="error" variant="h6">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   // Render Doctor Information
//   if (!doctor) {
//     return (
//       <Box sx={{ textAlign: "center", padding: 2 }}>
//         <Typography color="text.secondary" variant="h6">
//           Doctor not found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid
//         container
//         spacing={3}
//         alignItems="center"
//         sx={{
//           flexDirection: { xs: "column", sm: "row" },
//         }}
//       >
//         {/* Image Section */}
//         <Grid item xs={12} sm={4}>
//           <img
//             src={doctor.imageUrl}
//             alt={doctor.title || "Doctor"}
//             style={{
//               width: "100%",
//               borderRadius: 8,
//               objectFit: "cover",
//               maxHeight: 300,
//             }}
//           />
//         </Grid>

//         {/* Content Section */}
//         <Grid item xs={12} sm={8}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Name: {doctor.title}
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Qualification: {doctor.qualification}
//           </Typography>

//           <Box mt={2}>
//             <Typography variant="h6" gutterBottom>
//               About
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               {doctor.exploredescription}
//             </Typography>
//           </Box>

//           <Box mt={2}>
//             <Typography
//               variant="subtitle1"
//               color="text.primary"
//               fontWeight="bold"
//             >
//               Consultation Charges: {doctor.charges}
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DoctorInfo;
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  IconButton,
  Button,
  Rating,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Chip from "@mui/joy/Chip";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import styles from "/src/Styles/infoDocTesting.module.css";
import { doctorProfileDataTypes } from "../../customDataTypes/datatypes";

const DoctorInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [profileData, setProfileData] =
    React.useState<doctorProfileDataTypes>();

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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

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
    <>
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          maxWidth: "80%",
          margin: "auto",
          marginBottom: "20px",
          padding: 2,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
        }}
      >
        {/* Image Section */}
        <AspectRatio
          ratio="8/9"
          sx={{
            width: { xs: "100%", sm: 250 },
            borderRadius: 2,
            minHeight: { xs: 200, sm: 200 },
            maxHeight: "550px",
          }}
        >
          <img
            src={doctor.imageUrl}
            alt={doctor.title || "Doctor"}
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid light",
              paddingBottom: "4px",
            }}
          />
        </AspectRatio>

        {/* Content Section */}
        <CardContent sx={{ flex: 1 }}>
          {/* Doctor's Name */}
          <Typography
            // level="title-lg"
            sx={{ color: "#10a0bd", fontWeight: "bold", fontSize: "42px" }}
          >
            Dr. {doctor.title}
          </Typography>

          {/* Doctor's Name */}
          <Typography
            // level="title-lg"
            sx={{
              color: "#8e92a4",
              fontWeight: "lighter",
              fontSize: "18px",
              marginLeft: "5px",
            }}
          >
            {doctor.qualification}
          </Typography>

          {/* Consultation Charges */}
          <Box
            sx={{
              display: "flex", // Align items in a row
              gap: 2, // Add space between Chips
              marginTop: "15px",
              flexWrap: "wrap", // Wrap items if needed on small screens
            }}
          >
            <Chip
              variant="outlined"
              color="primary"
              size="sm"
              sx={{
                marginY: 1,
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginTop: "15px",
                color: "#8e92a4",
                cursor: "pointer",
              }}
              startDecorator={<MonetizationOnIcon sx={{ color: "#10a0bd" }} />}
            >
              Consultation Charges: {doctor.charges}
              {doctor.preferredCurrency}
            </Chip>
            <Chip
              variant="outlined"
              color="primary"
              size="sm"
              sx={{
                marginY: 1,
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginTop: "15px",
                color: "#8e92a4",
                cursor: "pointer",
              }}
              startDecorator={<WorkIcon sx={{ color: "#10a0bd" }} />}
            >
              Work Experience: {doctor.workExperience} Years
            </Chip>
          </Box>

          {/* About Section - Accordion */}
          <Accordion defaultExpanded sx={{ boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: "#8e92a4", fontSize: "18px" }}
              >
                Doctor Profile
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "lighter", textAlign: "justify" }}
              >
                {doctor.exploredescription}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default DoctorInfo;
