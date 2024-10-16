import React from "react";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
// import styles from "./index.css";
import Box from "@mui/material/Box";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { login as doctorLogin, logout as doctorLogout} from './store/authDoctorSlice';
import { login as patientLogin, logout as patientLogout} from './store/authPatientSlice';


function App() {
  const dispatch = useDispatch();
  const doctorToken = useSelector((state:any) => state.authDoctor.token);
  const patientToken = useSelector((state:any) => state.authPatient.token);

  React.useEffect(() => {
    // Check if the token exists in localStorage when the app loads
    // const doctorToken  = localStorage.getItem('doctortoken');

    if (doctorToken) {
      // Decode the JWT manually to check the expiration time
      const payloadBase64 = doctorToken.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payloadBase64)); 
      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedPayload.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('doctorToken'); // Remove token from localStorage
        dispatch(doctorLogout()); // Dispatch logout action
      } else {
        const userID = decodedPayload.userID;
        // Token is still valid
        dispatch(doctorLogin({ doctorToken, userID }));
      }
    }
   
  }, [dispatch, doctorToken]);

  React.useEffect(() => {
    // Check if the token exists in localStorage when the app loads
    // const patientToken = localStorage.getItem('patientToken');
    // console.log("patient-token", patientToken);
    
    if (patientToken) {
      // Decode the JWT manually to check the expiration time
      const payloadBase64 = patientToken.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payloadBase64)); 

      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedPayload.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('patientToken'); // Remove token from localStorage
        dispatch(patientLogout()); // Dispatch logout action
      } else {
        // Token is still valid
        dispatch(patientLogin({ patientToken }));
      }
    }
  }, [dispatch, patientToken]);
  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, paddingTop: "50px" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default App;
