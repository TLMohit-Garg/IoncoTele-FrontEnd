import React from "react";
import { Grid } from "@mui/material";
import styles from "../../Styles/onlineSection.module.css";
import Typography from "@mui/joy/Typography";
import IconLabelButtons from "../CustomButton/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function OnlineSection() {
  return (
    <>
      <Grid
        item
        container
        xl={12}
        sm={12}
        md={12}
        lg={12}
        xs={12}
        className={styles.parentGrid}
        justifyContent={"center"}
      >
        <Grid
          item
          container
          xl={8}
          sm={8}
          md={8}
          lg={8}
          xs={8}
          className={styles.childGrid}
          justifyContent={"space-between"}
          pt={5}
          pb={5}
        >
          <Grid
            item
            xl={5}
            sm={5}
            md={5}
            lg={5}
            xs={5}
            className={styles.parentGrid}
            justifyContent={"left"}
            ml={5}
          >
            <Typography className={styles.consultationText} mt={3}>
              Start An Online Chat Consultation With Our Doctor
            </Typography>
            <Typography className={styles.consultationPara} mt={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              elusmod tempor ho jata hai dolore mangwe.
            </Typography>
          </Grid>
          <Grid
            item
            container
            xl={5}
            sm={5}
            md={5}
            lg={5}
            xs={5}
            className={styles.parentGrid}
            justifyContent={"center"}
          >
            <Grid
              container
              item
              xl={12}
              sm={12}
              md={12}
              lg={12}
              xs={12}
              justifyContent={"center"}
            >
              <Link to="/doctors">
                <IconLabelButtons
                  name="Consultation Now"
                  className={styles.button}
                  fullWidth={true}
                  buttonWidth="250px"
                />
              </Link>
            </Grid>
            <Grid
              container
              item
              xl={12}
              sm={12}
              md={12}
              lg={12}
              xs={12}
              justifyContent={"center"}
              mt={4}
            >
              <IconLabelButtons
                name="More information"
                className={styles.button2}
                buttonWidth="250px"
                endIcon={<ArrowForwardIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default OnlineSection;
