import React from "react";
import { Grid } from "@mui/material";
import data from "./data.json";
import CustomCard from "../../components/customCards";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoctorDetailsModal from "../../components/doctorDetailModal";
import styles from "../../Styles/doctorpage.module.css";

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);  // To store the selected doctor
  const [modalOpen, setModalOpen] = React.useState(false);

  console.log("doc-data",data);
  const handleCardClick = (doctor: any) => {
    console.log("doctor-data", doctor);
    setSelectedDoctor(doctor);  // Set the selected doctor
    setModalOpen(true);  // Open the modal
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);  // Close the modal
  };
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
        {data?.map((doctor) => (
          <CustomCard
            key={doctor.id}
            image={doctor.imageUrl}
            title={doctor.title}
            speciality={doctor.speciality}
            description={doctor.description}
            buttonText="Explore More"
            onButtonClick={() => handleCardClick(doctor)}
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

      {modalOpen && selectedDoctor && (
        <DoctorDetailsModal
          open={modalOpen}
          onClose={handleModalClose}
          doctor={selectedDoctor}  // Pass selected doctor to modal
        />
      )}
    </>
  );
}
