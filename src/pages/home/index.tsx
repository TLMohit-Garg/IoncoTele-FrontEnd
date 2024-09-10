import styles from "../../Styles/home.module.css";
import { Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinearWithValueLabel from "../../components/progressBar";
import individualDoctor from "../../assets/doc11.png";
import docConsult from "../../assets/docConsultation.jpg";
import Chooseus from "../../components/chooseUs";
import OnlineSection from "../../components/onlineChat";
import Feedback from "../../components/feedback";
import WorldMap from "../../components/worldMap";

export default function Home() {
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
        mt={12}
        mb={12}
        justifyContent={"center"}
      >
        <Grid
          className={styles.teliConsultationWith}
          container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          justifyContent={"center"}
        >
          <Grid
            container
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            justifyContent={"center"}
          >
            Tele Consultation With Our Doctor’s Anywhere, Anytime by Video Call
          </Grid>
        </Grid>
        <Grid
          className={styles.bannerParatext}
          container
          item
          xl={7}
          lg={7}
          md={7}
          sm={7}
          xs={7}
          mt={3}
          justifyContent={"end"}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit
        </Grid>
      </Grid>

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
        // sx={{ border: "1px solid red" }}
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
          mb={12}
          justifyContent={"center"}
        >
          <img
            src={docConsult}
            alt={"consultation"}
            className={styles.consultImageFirst}
          />
          {/* <img
            src={docConsult}
            alt={"consultation"}
            className={styles.consultImageSecond}
          /> */}
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
          <Grid
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
          </Grid>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do
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
                    src={individualDoctor}
                    alt={"docimage"}
                    className={styles.docImage}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography className={styles.drName}>
                    Dr. Marlie Varga
                  </Typography>
                  <Typography className={styles.founderName}>
                    Founder Ionco Sol.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do
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
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}></Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography className={styles.drName}>
                    Dr. Marlie Varga
                  </Typography>
                  <Typography className={styles.founderName}>
                    Founder Ionco Sol.
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
        <WorldMap />
      </Grid>
    </>
  );
}
