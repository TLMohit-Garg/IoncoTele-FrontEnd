import { Grid } from "@mui/material";
import React from "react";
import data from "./data.json";
import CustomCard from "../../components/customCards";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "../../Styles/doctorpage.module.css";

export default function Doctors() {
  const handleShareClick = () => {};
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent={"center"}
        className={styles.ourDoctor}
      >
        Our Doctors
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent={"center"}
        className={styles.textLine}
      >
        Team of our Dedicated Doctor's
      </Grid>
      <Grid container item justifyContent={"space-around"}>
        {data?.map((data) => (
          <CustomCard
            image={data.imageUrl}
            title={data.title}
            speciality={data.speciality}
            description={data.description}
            buttonText="Explore More"
            onButtonClick={handleShareClick}
          />
        ))}
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent={"center"}
        mt={4}
        className={styles.explore}
      >
        Explore More
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent={"center"}
        mb={14}
        mt={1}
        className={styles.exploreIcon}
      >
        <ArrowDropDownIcon />
      </Grid>
    </>
  );
}
