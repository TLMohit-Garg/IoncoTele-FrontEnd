import React from "react";
import { Grid, Typography } from "@mui/material";
import logodoc from "../../assets/logoDoc.png";
import docConsultation2 from "../../assets/docsconsul2.jpg";
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
            why choose Us
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
            We Offer A Complete Range of Online Doctor Consultation
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
                Consult with highly trained and experienced doctors dedicated to providing the best care possible
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
              <img src={logodoc} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  Range of Specialities
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                Access a wide array of medical specialties, ensuring all your health needs are met
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
              <img src={logodoc} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  24/7 Availability
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                Get the support you need, anytime, anywhere, with our round-the-clock healthcare services
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
              <img src={logodoc} className={styles.logo} />
              <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
                <Typography className={styles.chooseustext} mt={3}>
                  Quality Service
                </Typography>
              </Grid>
              <Grid item xl={6} sm={6} md={6} lg={6} xs={6}>
                <Typography className={styles.chooseusPara}>
                Experience top-notch healthcare services delivered with care, precision, and professionalism
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} sm={6} md={6} lg={6} xs={6} mt={12} pt={8}>
          <img
            src={docConsultation2}
            alt={"consulation image 2"}
            className={styles.image}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Chooseus;
