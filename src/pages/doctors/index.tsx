import React from "react";
import { Grid } from "@mui/material";
import CustomCard from "../../components/customCards";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoctorDetailsModal from "../../components/doctorDetailModal";
import styles from "../../Styles/doctorpage.module.css";
import axios from "axios";
import BookingForm from "../../components/testingStripe2";
import { useDispatch } from "react-redux";
import { selectDoctor } from "../../store/selectedDoctorSlice";
import doctorsData from "./data.json";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

interface Doctor {
  id: string;
  imageUrl: string;
  title: string;
  speciality: string;
  description: string;
  charges: string;
}

export default function Doctors() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(
    null
  ); // To store the selected doctor
  const [modalOpen, setModalOpen] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useDispatch();
  const filteredDoctors = location.state?.filteredDoctors || [];

  const handleViewProfile = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
    // alert("view profile got clicked");
  };

  console.log("doc-data before API hit", data);
  const handleCardClick = (doctor: any) => {
    console.log("doctor-data before card hit", doctor);
    setSelectedDoctor(doctor); // Set the selected doctor
    setModalOpen(true); // Open the modal
    dispatch(selectDoctor(doctor)); // Dispatch the selected doctor to the store
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctorProfile');
        console.log("API Response Data:", response.data.doctors);
        
        if (Array.isArray(response.data)) {
          setData(response.data); 
        } else if (response.data.doctors) {
          setData(response.data.doctors); 
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch doctors data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
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
      {/* {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor:any) => (
          <CustomCard
            key={doctor.id}
            id={doctor.id}
            image={doctor.imageUrl}
            title={doctor.title}
            speciality={doctor.speciality}
            description={doctor.description}
            buttonText="Book Consultation"
            secondButtonText="View Profile"
            hourlyCharges={doctor.charges}
            onButtonClick={() => handleCardClick(doctor)}
            handleViewProfile={() => handleViewProfile(doctor.id)}
          />
        ))
      ) : (
        <p>No doctors found for the selected speciality and country.</p>
        
      )} */}

      {Array.isArray(data) ? (
        data.map((doctor) => (
          <CustomCard
            key={doctor.userId?._id}
            id={doctor.userId?._id}
            image={doctor.imageUrl}
            title={doctor.title}
            speciality={doctor.speciality}
            description={doctor.description}
            buttonText="Book Consultation"
            secondButtonText="View Profile"
            hourlyCharges={doctor.charges}
            onButtonClick={() => handleCardClick(doctor)}
            handleViewProfile={() => handleViewProfile(doctor.userId?._id)}
          />
        ))
      ) : (
        <p>No doctors available.</p>
      )}
        {/* {data.map((doctor) => (
          <CustomCard
          key={doctor.id}
          hourlyCharges={doctor.charges}
          onButtonClick={() => handleCardClick(doctor)}
          />
        ))} */}
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
          doctor={selectedDoctor} // Pass selected doctor to modal
        />
      )}

      {/* {selectedDoctor && (
        <BookingForm
          // patientEmail="test@example.com" // Replace with real patientEmail
          doctorPrice={selectedDoctor?.charges} // Pass the dynamically selected doctorPrice
        />
      )} */}
    </>
  );
}
