import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinearWithValueLabel from "../../components/progressBar";
// import individualDoctor from "../../assets/doc11.png";
import docConsult from "../../assets/cut-image (1).png";
import Chooseus from "../../components/chooseUs";
import OnlineSection from "../../components/onlineChat";
import Feedback from "../../components/feedback";
import WorldMap from "../../components/worldMap";
// import TestingStripe from "../../components/testingStripe";
// import BookingForm from "../../components/testingStripe2";
import CountrySelect from "../../components/countrySelect";
import SearchDoctor from "../../components/searchComponent";
import { useNavigate } from "react-router-dom";
// import doctorsData from "../../pages/doctors/data.json";
// import countriesData from "../../components/countrySelect/data.json";
import styles from "../../Styles/home.module.css";
import DoctorSpecialitySelect from "../../components/doctorSpecialitySelect";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { DoctorType } from "../../customDataTypes/datatypes";
import CitySelect from "../../components/citySelect";
import bannerImage from "../../assets/banner---Copy.png";


export default function Home() {
  const navigate = useNavigate();
  const [selectedSpeciality, setSelectedSpeciality] = React.useState<
    string | null
  >(null);
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(
    null
  );
  const [selectedCity, setSelectedCity] = React.useState<string | null>(
    null
  );
  const [doctors, setDoctors] = React.useState<DoctorType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/doctorProfile");
        console.log("API Response after select :", response.data.doctors);
        // Ensure the API returns an array of doctors
        if (Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        } else {
          setDoctors([]);
          console.error("Unexpected API response format.");
        }
      } catch (err) {
        setError("Failed to fetch doctors data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSpecialityChange = (event: any) => {
    const speciality = event.target.value;
    console.log("Selected speciality before update:", selectedSpeciality);
    setSelectedSpeciality(speciality);
    console.log("Selected speciality after update:", speciality);
  };

  const handleCountryChange = (event: any) => {
    const country = event.target.value;
    console.log("Selected country before update:", selectedCountry);
    setSelectedCountry(country);
    console.log("Selected country after update:", country);
  };

  const handleSearch = () => {
    console.log("Search triggered!");
    console.log("Selected speciality:", selectedSpeciality);
    console.log("Selected country:", selectedCountry);
    console.log("Selected city:", selectedCity);
    if (selectedSpeciality && selectedCountry && selectedCity && Array.isArray(doctors)) {
      console.log("Doctors data before filtering:", doctors);

      // Filter doctors based on speciality and country
      const filteredDoctors = doctors.filter(
        (doctor) =>
          doctor.speciality.toLowerCase().trim() === selectedSpeciality.toLowerCase().trim() &&
          doctor.country.toLowerCase().trim() === selectedCountry.toLowerCase().trim()
      );
      console.log("Filtered doctors:", filteredDoctors);

      if (filteredDoctors.length === 1) {
        console.log("Navigating to a single doctor profile:", filteredDoctors[0]);

        // Navigate to the single doctor's profile
        navigate(`/doctor/${filteredDoctors[0].userId?._id}`);
      } else if (filteredDoctors.length > 1) {
        console.log("Navigating to results page with multiple doctors:", filteredDoctors);

        // Navigate to the results page with filtered doctors
        navigate("/doctors", { state: { filteredDoctors } });
      } else {
        // Handle no matching doctors
        console.log("No doctors found for this speciality and country.");
      }
    } else {
      console.log("Either speciality or country is not selected, or doctors data is invalid.");
    }
  };

  // const handleSearch = () => {
  //   if (selectedSpeciality && selectedCountry) {
  //     const filteredDoctors = doctors.filter(
  //       (doctor) =>
  //         doctor.speciality.toLowerCase() ===
  //           selectedSpeciality.toLowerCase() &&
  //         doctor.country.toLowerCase() === selectedCountry.toLowerCase()
  //     );

  //     if (filteredDoctors.length === 1) {
  //       // Navigate to a single doctor profile if only one match
  //       const doctor = filteredDoctors[0];
  //       navigate(`/doctor/${doctor.userId?._id}`);
  //     } else if (filteredDoctors.length > 1) {
  //       // Navigate to the results page if multiple matches found
  //       navigate("/doctors", { state: { filteredDoctors } });
  //     } else {
  //       console.log("No doctors found for this speciality and country.");
  //     }
  //   }
  // };
  return (
    <>
      {/* Banner Section */}
      <Grid
        className={styles.completeBannerSectionGroup}
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        mb={12}
        sx={{
          position: "relative",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Full height
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Grid
          container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          }}
        />

        <Grid
          className={styles.teliConsultationWith}
          container
          item
          xl={8}
          lg={8}
          md={8}
          sm={10}
          xs={11}
        >
          Tele Consultation With Our Doctor’s Anywhere, Anytime by Video Call
        </Grid>

        <Grid
          className={styles.bannerParatext}
          container
          item
          xl={6}
          lg={6}
          md={8}
          sm={10}
          xs={11}
        >
          Get expert medical advice from the comfort of your home with our video
          consultation service. Connect with our experienced doctors in real time,
          wherever you are, for a range of medical needs—from general health concerns
          to specialist consultations. 
          {/* Our seamless video platform allows you to
          receive guidance, discuss symptoms, and get personalized recommendations,
          all without needing to visit a clinic. */}
        </Grid>
      </Grid>
            <Grid container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          justifyContent={"center"}
          className={styles.SearchText}>
        Explore Doctors Worldwide
           </Grid>
      <Grid
        className={styles.searchBar}
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        mb={7}
        justifyContent={"center"}
      >
        <Grid
          container
          item
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          pl={2}
          justifyContent={"center"}
          className={styles.doctorsearchBar}
        >
          <SearchDoctor
            // doctors={doctorsData as DoctorType[]}
            setSelectedSpeciality={setSelectedSpeciality}
          />
        </Grid>
        <Grid
          container
          item
          xl={2}
          lg={2}
          md={2}
          sm={12}
          xs={12}
          justifyContent={"center"}
          className={styles.specialitySearchBar}
        >
          <DoctorSpecialitySelect
            setSelectedSpeciality={setSelectedSpeciality}
          />
        </Grid>
        <Grid
          container
          item
          xl={2}
          lg={2}
          md={2}
          sm={12}
          xs={12}
          justifyContent={"left"}
          className={styles.countrysearchBar}
        >
          <CountrySelect
            setSelectedNationality={setSelectedCountry}
          />
        </Grid>
        <Grid
          container
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
          justifyContent={"flex-start"}
          alignItems={"center"}
          className={styles.citysearchBar}
        >
          <Grid item xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}>
            <CitySelect setSelectedCity={setSelectedCity} />
          </Grid>
          <Grid container item xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              onClick={() => {
                console.log("Search button clicked");
                handleSearch();
              }}
              disabled={!selectedSpeciality || !selectedCountry || !selectedCity}
              sx={{
                marginLeft: "5px",
                height: "55px",
                bgcolor:
                  !selectedSpeciality || !selectedCountry || !selectedCity
                    ? "grey.300"
                    : "#10a0bd",
                color: "white",
                "&:hover": {
                  bgcolor: "#10a0bd",
                },
                "&:focus": {
                  bgcolor: "#10a0bd",
                },
                "&.Mui-disabled": {
                  bgcolor: "grey.300",
                  color: "grey.500",
                },
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>

        </Grid>
      </Grid>

      {/* </Grid> */}
      <Grid
        className={styles.completeBannerSectionGroup}
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        mt={12}
        mb={12}
        justifyContent={"center"}
      >
        <Grid
          className={styles.completeBannerSectionGroup}
          container
          item
          xl={7}
          lg={7}
          md={7}
          sm={7}
          xs={7}
          mt={6}
          pt={6}
          mb={12}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src={docConsult}
            alt={"consultation"}
            className={styles.consultImageFirst}
          />
        </Grid>
        <Grid
          className={styles.rightsideGrid}
          container
          item
          xl={5}
          lg={5}
          md={5}
          sm={5}
          xs={5}
          mt={6}
          mb={12}
          justifyContent={"start"}
        >
          <Grid
            className={styles.headerGrid}
            container
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            mt={6}
          >
            We Provide Best Online Doctor Consultation For You
          </Grid>
          {/* <Grid
            className={styles.paraGrid}
            container
            item
            xl={10}
            lg={10}
            md={10}
            sm={10}
            xs={10}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Grid> */}
          <Grid
            className={styles.cardsGrid}
            container
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            // sx={{ border: "1px solid red" }}
            justifyContent={"space-between"}
          >
            <Grid container item xl={5} lg={5} md={5} sm={5} xs={5}>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ fontSize: "22px" }}
                mt={5}
              >
                <Grid container item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <CheckCircleIcon
                    sx={{
                      fontSize: "35px",
                      color: "#10A0BD",
                      paddingTop: "12px",
                    }}
                  />
                </Grid>
                <Grid container item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Typography className={styles.textConsultation}>
                    Individual Doctor Consultation
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                <Typography className={styles.textconsultPara}>
                  Get personalized recommendations, all without needing to visit
                  a clinic
                </Typography>
              </Grid>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                justifyContent={"space-between"}
                mt={3}
              >
                <Typography className={styles.totalConsult}>
                  Total Consultation’s
                </Typography>
                <Typography className={styles.totalConsultPercentage}>
                  62%
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={2} pl={1}>
                <LinearWithValueLabel />
              </Grid>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                mt={2}
              >
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  // sx={{ border: "1px solid red" }}
                  justifyContent={"center"}
                  pl={2}
                >
                  <img
                    src={
                      "https://teleconsultation.ioncosolutions.com/assets/Dr-Munish-Gairola.jpg"
                    }
                    alt={"docimage"}
                    className={styles.docImage}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography className={styles.drName}>
                    Dr. Munish Gairola
                  </Typography>
                  <Typography className={styles.founderName}>
                    Radiation Oncology
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xl={5} lg={5} md={5} sm={5} xs={5}>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // justifyContent={"space-evenly"}
                sx={{ fontSize: "22px" }}
                mt={5}
              >
                <Grid container item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <CheckCircleIcon
                    sx={{
                      fontSize: "35px",
                      color: "#10A0BD",
                      paddingTop: "12px",
                    }}
                  />
                </Grid>
                <Grid container item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Typography className={styles.textConsultation}>
                    Multiple Doctor's Consultation
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <Typography className={styles.textconsultPara}>
                  Consult with multiple doctors effortlessly through our
                  platform easily
                </Typography>
              </Grid>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                justifyContent={"space-between"}
                mt={3}
              >
                <Typography className={styles.totalConsult}>
                  Total Consultation’s
                </Typography>
                <Typography className={styles.totalConsultPercentage}>
                  54%
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={2} pl={1}>
                <LinearWithValueLabel />
              </Grid>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                mt={2}
              >
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  <img
                    src={
                      "https://teleconsultation.ioncosolutions.com/assets/Dr-(Col)-Ashok-Kumar.jpg"
                    }
                    alt={"docimage"}
                    className={styles.docImage}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography className={styles.drName}>
                    {/* Dr. Marlie Varga */}
                    Dr. (Lt Col) Ashok Kumar
                  </Typography>
                  <Typography className={styles.founderName}>
                    {/* Founder Ionco Sol. */}
                    Radiation Oncology
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Chooseus />
      </Grid>
      <Grid mt={10}>
        <OnlineSection />
      </Grid>
      <Grid>
        <Feedback />
      </Grid>
      <Grid>
        {/* <WorldMap /> */}
      </Grid>
    </>
  );
}
