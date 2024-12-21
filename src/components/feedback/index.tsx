import React from "react";
import { Grid, Typography } from "@mui/material";
import styles from "../../Styles/home.module.css";

function Feedback() {
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        lg={12}
        xl={12}
        md={12}
        justifyContent={"center"}
        className={styles.feedbackSection}
        mt={12}
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          md={12}
          justifyContent={"center"}
        >
          <Typography className={styles.patientFeedback}>
            Patients Feedback
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          md={12}
          justifyContent={"center"}
          mt={5}
        >
          <Typography className={styles.positiveFeedback}>
            Positive Feedback From Our Patients
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={7}
          sm={7}
          lg={7}
          xl={7}
          md={7}
          justifyContent={"center"}
        >
          <Typography className={styles.paraFeedback} sx={{textAlignLast:"center"}}>
          Read the positive testimonials from our patients who have experienced excellent consultation and outstanding results with Ionco Tele Consultation.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Feedback;
