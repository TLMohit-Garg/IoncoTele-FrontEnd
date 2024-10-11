import React from "react";
import { Grid } from "@mui/material";
import data from "./data.json";
import CustomCard from "../../components/customCards";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoctorDetailsModal from "../../components/doctorDetailModal";
import styles from "../../Styles/doctorpage.module.css";
import axios from "axios";

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);  // To store the selected doctor
  const [modalOpen, setModalOpen] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

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

  React.useEffect(()=> {
    const fetchDoctors = async() => {
    try{
      const response = await axios.get("/api/doctorSignup");
      setData(response.data)
      setLoading(false);
    }catch(err){
      setError('Failed to fetch doctors data.'); 
      setLoading(false);
    }
  }
  fetchDoctors();
  },[])
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
        {/* {data?.map((doctor) => (
          <CustomCard
            key={doctor.id}
            image={doctor.imageUrl}
            title={doctor.title}
            speciality={doctor.speciality}
            description={doctor.description}
            buttonText="Explore More"
            hourlyCharges={doctor.charges}
            onButtonClick={() => handleCardClick(doctor)}
          />
        ))} */}
        {data.map((doctor) => (
          <CustomCard
          hourlyCharges={doctor.charges}
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
