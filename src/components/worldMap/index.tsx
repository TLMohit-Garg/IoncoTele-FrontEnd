import React from "react";
import styles from "../../Styles/home.module.css";
import { Grid } from "@mui/material";
import individualDoctorSecond from "../../assets/doc3.png";
import individualDoctorThird from "../../assets/doc5.png";
import individualDoctorFourth from "../../assets/doc6.png";
import imageWorldmap from "../../assets/worldMap.jpg";
import individualDoctor from "../../assets/doc11.png";

function WorldMap() {
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
        className={styles.WorldmapSection}
      >
        <img src={imageWorldmap} className={styles.imageWorldmap} />
        <img
          src={individualDoctor}
          alt={"docimage"}
          className={styles.docImageOverMap1}
        />
        <img
          src={individualDoctorSecond}
          alt={"docimage"}
          className={styles.docImageOverMap2}
        />
        <img
          src={individualDoctorThird}
          alt={"docimage"}
          className={styles.docImageOverMap3}
        />
        <img
          src={individualDoctorFourth}
          alt={"docimage"}
          className={styles.docImageOverMap4}
        />
      </Grid>
    </>
  );
}

export default WorldMap;
