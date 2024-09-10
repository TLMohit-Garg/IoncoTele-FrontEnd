import React from "react";
import { Popover, Grid, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { DoctorPopoverProps } from "../../customDataTypes/datatypes";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toast } from "../ToastMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doctorSigninSchema } from "../../utils/validation";
import styles from "../../Styles/header.module.css";

const DoctorPopover: React.FC<DoctorPopoverProps> = ({
  open,
  anchorEl,
  handleClose,
}: DoctorPopoverProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({
    resolver: yupResolver(doctorSigninSchema),
  });
  const handleSignIn = async(data: any) => {
    console.log(JSON.stringify(data));
    try {
     const response = await axios.post("/api/doctorSignin",data);
     console.log('Response received:', response)

     if(response.status === 200){
      console.log("Sign in succesfully");
      Toast("success","SignIn successFully");
      reset();
     }else{
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
          <Grid className={styles.doctorHeader}>
            I want to be a part of Doctors
          </Grid>
          <Grid className={styles.doctorHeader}>My Login area</Grid>
          <Divider className={styles.divider} />
          <Grid className={styles.email}>Telephone number or email</Grid>
          <Grid container justifyContent={"center"}>
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
            <Button variant="outlined" size="large" fullWidth type="submit">
              Login
            </Button>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Link to="/doctorSignup" onClick={handleClose}>
              <Button variant="text">Register</Button>
            </Link>
          </Grid>
        </Grid>
        <ToastContainer/>
      </form>
    </Popover>
  );
};

export default DoctorPopover;
