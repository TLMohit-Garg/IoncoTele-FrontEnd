import React from "react";
import { Grid, Typography } from "@mui/material";
import logodoc from "../../assets/doctorsIcon.png";
import rangeheartIcon from "../../assets/rangeHeartIcon.png";
import timeIcon from "../../assets/24Icon.png";
import qualityService from "../../assets/quality-service.png";
// import docConsultation2 from "../../assets/docWithPatient.png";
// import docOnscreen2 from "../../assets/docOnscreen2.png";
// import docOnScreen from "../../assets/docOnScreen.png";
import styles from "../../Styles/chooseUs.module.css";

function Chooseus() {
  return (
    <>
      <Grid
        container
        item
        className={styles.parentGrind}
        xl={12}
        sm={12}
        md={12}
        lg={12}
        xs={12}
      >
        <Grid item xl={6} sm={6} md={6} lg={6} xs={6} mt={8} pl={8}>
          <Grid
            xl={12}
            sm={12}
            md={12}
            lg={12}
            xs={12}
            className={styles.chooseus}
          >
            Why Choose Us
          </Grid>
          <Grid
            xl={8}
            sm={8}
            md={8}
            lg={8}
            xs={8}
            className={styles.chooseusHeading}
            mt={5}
          >
            Ionco is your comprehensive care partner
            in your cancer treatment journey.
          </Grid>
          <Grid
            container
            item
            xl={12}
            sm={12}
            md={12}
            lg={12}
            xs={12}
            className={styles.chooseus}
            mt={4}
            pb={8}
          >
            <Grid
              xl={6}
              sm={6}
              md={6}
              lg={6}
              xs={6}
              className={styles.chooseus}
              mt={8}
            >
              <img src={logodoc} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  Qualified Doctors
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                  Consult with highly trained and experienced doctors dedicated
                  to providing the best possible care.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              xl={6}
              sm={6}
              md={6}
              lg={6}
              xs={6}
              className={styles.chooseus}
              mt={8}
            >
              <img src={rangeheartIcon} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  Range of Specialities
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                  Access a wide array of cancer specialties, ensuring all your
                  health needs are met.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              xl={6}
              sm={6}
              md={6}
              lg={6}
              xs={6}
              className={styles.chooseus}
              mt={8}
            >
              <img src={timeIcon} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  24/7 Availability
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                  Get the support you need, anytime, anywhere, with our
                  round-the-clock healthcare services.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              xl={6}
              sm={6}
              md={6}
              lg={6}
              xs={6}
              className={styles.chooseus}
              mt={8}
            >
              <img src={qualityService} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  Quality Service
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                  Experience top-notch healthcare services delivered with care,
                  precision, and professionalism.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xl={6}
          sm={6}
          md={6}
          lg={6}
          xs={6}
          mt={12}
          // pt={8}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            item
            xl={10}
            sm={6}
            md={6}
            lg={8}
            xs={6}
            // mt={12}
            // pt={8}
            sx={{ alignSelf: "flex-start" }}
          >
            <img
              src={"https://res.cloudinary.com/dheqzi81c/image/upload/v1734779184/docWithPatient_bwsg1u.avif"}
              alt={"consulation image 2"}
              className={styles.image}
            />
          </Grid>
          <Grid
            item
            xl={10}
            sm={6}
            md={6}
            lg={8}
            xs={6}
            mt={2}
            // pt={8}
            sx={{ alignSelf: "flex-end" }}
          >
            <img
              src={"https://res.cloudinary.com/dheqzi81c/image/upload/v1734779100/docOnscreen2_q2uhnk.avif"}
              alt={"consulation image 2"}
              className={styles.image}
            />
          </Grid>
          <Grid
            item
            xl={10}
            sm={6}
            md={6}
            lg={8}
            xs={6}
            mt={2}
            // pt={8}
            sx={{ alignSelf: "flex-start" }}
          >
            <img
              src={"https://res.cloudinary.com/dheqzi81c/image/upload/v1734779085/docOnScreen_yr8acv.avif"}
              alt={"consulation image 2"}
              className={styles.image}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Chooseus;
