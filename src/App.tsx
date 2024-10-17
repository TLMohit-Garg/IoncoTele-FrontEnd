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

  //For Doctor
  const doctorTokenRedux  = useSelector((state:any) => state.authDoctor.token);
  const doctorEmailRedux = useSelector((state: any) => state.authDoctor.email);
  const doctorUserIdRedux = useSelector((state: any) => state.authDoctor.userId);

  //For Patient
  // const patientToken = useSelector((state:any) => state.authPatient.token);
  const patientTokenRedux = useSelector((state: any) => state.authPatient.token);
  const patientEmailRedux = useSelector((state: any) => state.authPatient.email);
  const patientUserIdRedux = useSelector((state: any) => state.authPatient.userId);

  React.useEffect(() => {
    // Check if the token exists in localStorage when the app loads
    const doctorToken  = localStorage.getItem('doctortoken');
    const doctorEmail = localStorage.getItem('doctorEmail');
    const doctorUserId = localStorage.getItem('doctorUserId');


    if (doctorToken && doctorUserId) {
      // Decode the JWT manually to check the expiration time
      const payloadBase64 = doctorToken.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payloadBase64)); 
      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedPayload.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('doctorToken'); 
        localStorage.removeItem('doctorEmail'); 
        localStorage.removeItem('doctorUserId'); 
        dispatch(doctorLogout()); // Dispatch logout action
      } else {
        // const userID = decodedPayload.userID;
        // dispatch(doctorLogin({ doctorToken, userID }));
        if (!doctorTokenRedux || !doctorUserIdRedux || !doctorEmailRedux) {
          dispatch(doctorLogin({
            token: doctorToken,
            email: doctorEmail,
            userId: doctorUserId,
          }));
        // dispatch(patientLogin({ patientToken }));
      }
      }
    }
   
  }, [dispatch, doctorTokenRedux, doctorUserIdRedux, doctorEmailRedux]);

  React.useEffect(() => {
    // Check if the token exists in localStorage when the app loads
    const patientToken = localStorage.getItem('patientToken');
    const patientEmail = localStorage.getItem('patientEmail');
    const patientUserId = localStorage.getItem('patientUserId');
    // console.log("patient-token", patientToken);
    
    if (patientToken && patientEmail && patientUserId) {
      // Decode the JWT manually to check the expiration time
      const payloadBase64 = patientToken.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payloadBase64)); 

      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedPayload.exp < currentTime) {
        localStorage.removeItem('patientToken'); // Remove token from localStorage
        localStorage.removeItem('patientEmail');
        localStorage.removeItem('patientUserId');
        dispatch(patientLogout()); // Dispatch logout action
      } else {
        // Check if Redux already has the data
        if (!patientTokenRedux || !patientEmailRedux || !patientUserIdRedux) {
          // Token is still valid, and Redux does not have the values yet
          dispatch(patientLogin({
            token: patientToken,
            email: patientEmail,
            userId: patientUserId
          }));
        // dispatch(patientLogin({ patientToken }));
      }
    }
  }
  }, [dispatch,  patientTokenRedux, patientEmailRedux, patientUserIdRedux]);
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
