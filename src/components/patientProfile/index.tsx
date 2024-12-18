import React from "react";
import { Grid, Typography } from "@mui/material";
import patientImage from "../../assets/doc8.png";
import Divider from "@mui/material/Divider";
import styles from "/src/Styles/patientProfile.module.css";
import axios from "axios";
import { patientProfileTypes } from "../../customDataTypes/datatypes";
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { selectPatientUserId, selectPatientToken, setUserData, selectPatientUserData } from "../../store/authPatientSlice";

function PatientProfile() {
  const userId = useSelector(selectPatientUserId);
  const token = useSelector(selectPatientToken);
  const userData = useSelector(selectPatientUserData); // Fetch from Redux
  const dispatch = useDispatch();

  // const userId = useSelector((state: RootState) => state.user.userId);
  // const token = useSelector((state: RootState) => state.authPatient.token);
  // const userId = localStorage.getItem("patientuserId");
  // const [userData, setuserData] = React.useState<patientProfileTypes>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error("User ID is not available");
        setLoading(false); // Stop loading if no user ID
        return;
      }
      try {
        // const response = await axios.get(
        //   `api/patientSignup/${userId}`
        // );
        // console.log(response, "signedIn patient data");
        // setuserData(response.data);
        const response = await axios.get(`/api/patientSignup/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token if needed
        });
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, token, dispatch, userData]);
  return (
    <>
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={styles.parentGrid}
        justifyContent={"space-between"}
      >
        <Grid
          container
          item
          xl={5}
          lg={5}
          md={5}
          sm={5}
          xs={5}
          className={styles.profileimageGrid}
        >
          <img
            src={patientImage}
            alt="patientimage"
            className={styles.profileimage}
          />
        </Grid>
        <Grid
          container
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={styles.profileinfo}
          mt={4}
        >
          {loading ? (
            <div>Loading...</div> // You can replace this with a spinner or loading animation
          ) : (
            userData && (
              <>
                <Grid
                  container
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles.profileName}
                >
                  <Typography className={styles.userName}>
                    {userData.firstName}
                  </Typography>
                </Grid>

                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mt={5}>
                  <Typography className={styles.contact}>
                    Contact Information
                  </Typography>
                  <Grid container item xl={10} lg={10} md={10} sm={10} xs={10}>
                    <Divider
                      textAlign="left"
                      variant="middle"
                      flexItem
                      sx={{ width: "100%", height: "1px" }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                    mt={2}
                  >
                    <Typography className={styles.email}>Email ID:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.email}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                  >
                    <Typography className={styles.email}>Phone no:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.phone}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mt={2}>
                  <Typography className={styles.contact}>
                    Basic Information
                  </Typography>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    pt={1}
                  >
                    <Divider
                      textAlign="left"
                      variant="middle"
                      flexItem
                      sx={{ width: "100%", height: "1px" }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                    mt={2}
                  >
                    <Typography className={styles.email}>Gender:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.gender}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                    mt={2}
                  >
                    <Typography className={styles.email}>
                      Nationality:
                    </Typography>
                    <Typography className={styles.emailValue}>
                      {userData.nationality}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                  >
                    <Typography className={styles.email}>Age:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.age}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default PatientProfile;
