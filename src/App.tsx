import React from "react";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
// import styles from "./index.css";
import Box from "@mui/material/Box";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";



function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Check if the token exists in localStorage when the app loads
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the JWT manually to check the expiration time
      const payloadBase64 = token.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payloadBase64)); 

      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedPayload.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('token'); // Remove token from localStorage
        dispatch(logout()); // Dispatch logout action
      } else {
        // Token is still valid
        dispatch(login({ token }));
      }
    }
  }, [dispatch]);

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
