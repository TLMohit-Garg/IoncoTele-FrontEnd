import React, { useState } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import {
  selectDoctorUserId,
  selectDoctorToken,
} from "../../store/authDoctorSlice";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

function UpdateProfile() {
  const token = useSelector(selectDoctorToken);
  const userId = useSelector(selectDoctorUserId);

  const [title, setTitle] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [description, setDescription] = useState("");
  const [exploredescription, setExploreDescription] = useState("");
  const [charges, setCharges] = useState("");
  const [country, setCountry] = useState("");
  const [qualification, setQualification] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId) {
      console.error("userId is required but missing");
      return;
    }

    const formData = new FormData();
    if (userId) {
      formData.append("userId", userId);
    } else {
      console.error("userId is missing");
      return;
    }
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("speciality", speciality);
    formData.append("description", description);
    formData.append("exploredescription", exploredescription);
    formData.append("charges", charges);
    formData.append("country", country);
    formData.append("qualification", qualification);
    formData.append("workExperience", workExperience);
    formData.append("preferredCurrency", preferredCurrency);
    // formData.append("image", image); // Append the image file
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "/api/doctorProfile/createProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Doctor profile created:", response.data);
    } catch (error) {
      console.error("Error creating doctor profile:", error);
    }
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          paddingBottom: "25px",
          // maxHeight: "calc(100vh - 50px)",
          // overflow: "auto",
          // boxSizing: "border-box",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            alignItems: "top",
            height: "150vh",
            paddingBottom: "25px",
          }}
        >
          {/* Left Column */}
          <Grid item xs={12} md={6} sx={{ paddingTop: "" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Inter, sans-serif", paddingTop: "45px" }}
            >
              Teleconsultation Made Simple
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontSize: "17px",
                fontFamily: "Inter, sans-serif",
                color: "#8e92a4",
                letterSpacing: "0.08em",
                fontWeight: "500",
                marginBottom: "40px",
              }}
            >
              Seamlessly connect with healthcare professionals and keep your
              profile updated to ensure a personalized experience.
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Effortlessly schedule online consultations with verified doctors.",
                "Keep your profile information updated for better recommendations.",
                "Access your medical records and prescriptions securely.",
                "Stay informed with reminders for follow-ups and tests.",
                "Stay informed with reminders for follow-ups and tests.",
              ].map((text, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: "35px",
                      color: "#10A0BD",
                      paddingTop: "12px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "normal",
                      color: "#8e92a4",
                      paddingLeft: "10px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {text}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Right Column */}
          <Grid
            item
            xs={12}
            md={6}
            pb={5}
            sx={{
              padding: "15px",
              backgroundColor: "#10a0bd",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              maxWidth: "100%",
              boxSizing: "border-box",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: "normal",
                color: "white",
                paddingLeft: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
              }}
            >
              Kindly Update your profile to verify
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "grid",
                gap: "15px",
                marginTop: "20px",
                width: "80%", // Adjust form width
                maxWidth: "400px", // Restrict maximum width for smaller inputs
                padding: "20px", // Add padding around the form
                backgroundColor: "white", // Optional: Add form background
                borderRadius: "5px", // Optional: Add rounded corners
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better design
              }}
            >
              <TextField
                label="Full Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                fullWidth
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Explore Description"
                value={exploredescription}
                onChange={(e) => setExploreDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Charges"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
                fullWidth
              />
              <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
              />
              <TextField
                label="Qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                fullWidth
              />
              <TextField
                label="Work Experience"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                fullWidth
              />
              <input type="file" onChange={handleFileChange} />
              <Typography>Select Preferred Currency</Typography>
              <Select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value)}
                fullWidth
              >
                <MenuItem value="">--Select Currency--</MenuItem>
                <MenuItem value="usd">USD</MenuItem>
                <MenuItem value="eur">Euro</MenuItem>
                <MenuItem value="gbp">Pound</MenuItem>
                <MenuItem value="inr">INR</MenuItem>
              </Select>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: "22px" }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UpdateProfile;