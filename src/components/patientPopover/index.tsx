import React from "react";
import { Popover, Grid, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { PatientPopoverProps } from "../../customDataTypes/datatypes";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Toast } from "../ToastMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { login } from "../../store/authPatientSlice";
import { setUserId } from '../../store/userSlice';
import styles from "../../Styles/header.module.css";

const PatientPopover: React.FC<PatientPopoverProps> = ({
  open,
  anchorEl,
  handleClose,
  onSignIn
}: PatientPopoverProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({
    resolver: yupResolver(signinSchema),
  });

  const dispatch = useDispatch();

   // Function to decode the JWT token manually
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); // Parse the payload as a JSON object
  } catch (error) {
    console.error("Invalid token format:", error);
    return null;
  }
};

  const handleSignIn = async (data: any) => {
    console.log(JSON.stringify(data));

    try {
      const response = await axios.post("/api/patientSignin", data);
      console.log('Response received:', response)
      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        console.log("Sign in successfully", token);
  
        // Decode the JWT token manually to extract the userId
        const decodedToken = decodeJWT(token);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken && decodedToken.userId) {
          const userId = decodedToken.userId;
          const email = data.email;
          console.log("Decoded userId:", userId);
  
          // Store the token in Redux and localStorage
          // dispatch(login({ token })); 
          // dispatch(login({ token: response.data.token, email: response.data.email }));
          dispatch(login({ token, email, userId  }));
          dispatch(setUserId(userId)); // Storing userId in Redux
  
          localStorage.setItem("patientToken", token);
          localStorage.setItem("patientuserId", userId); // Store userId in localStorage
          localStorage.setItem("patientEmail", email);
  
          reset(); 
          Toast("success", "SignIn successfully");
          onSignIn();
          handleClose(); 
        } else {
          console.error("Error decoding userId from token.");
          Toast("error", "Sign-in failed!");
        }
      } else {
        Toast("error", "Sign-in failed!");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      Toast("error", "An error occurred during sign-in!");
    }
  };
  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <form onSubmit={handleSubmit(handleSignIn)} style={{ width: "100%" }}>
        <Grid
          container
          className={styles.doctorLoginParentsection}
          sx={{ width: 250 }}
        >
          <Grid className={styles.doctorHeader}>My Login area</Grid>
          <Divider className={styles.divider} />
          <Grid className={styles.email}>Telephone number or email</Grid>
          <Grid
            container
            justifyContent={"center"}
            className={styles.textFieldParent}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  fullWidth
                  className={styles.textField}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabelProp, // Apply Custom styles to the Input Label
                    },
                  }}
                  error={!!errors.email} // Show error state if validation fails
                  helperText={errors.email?.message} // Show error message
                />
              )}
            />
          </Grid>
          <Grid className={styles.password}>Password</Grid>
          <Grid container justifyContent={"center"}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  fullWidth
                  className={styles.textField}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabelProp,
                    },
                  }}
                  error={!!errors.password} // Show error state if validation fails
                  helperText={errors.password?.message} // Show error message
                />
              )}
            />
          </Grid>
          <Grid className={styles.forgetPassword}>
            Have you forgotten your password?
          </Grid>
          <Grid container justifyContent={"center"} className={styles.loginBtn}>
            <Button variant="outlined" size="large" type="submit" fullWidth >
              Login
            </Button>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Link to="/patientSignup" onClick={handleClose}>
              <Button variant="text" >Join Now</Button>
            </Link>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Popover>
  );
};

export default PatientPopover;
