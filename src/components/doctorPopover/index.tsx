import React from "react";
import {
  Popover,
  Grid,
  TextField,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DoctorPopoverProps } from "../../customDataTypes/datatypes";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toast } from "../ToastMessage";
import { ToastContainer } from "react-toastify";
import { doctorSigninSchema } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { login } from "../../store/authDoctorSlice";
import { setUserId } from "../../store/userSlice";
import styles from "../../Styles/header.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const DoctorPopover: React.FC<DoctorPopoverProps> = ({
  open,
  anchorEl,
  handleClose,
  onSignIn,
}: DoctorPopoverProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any = useForm({
    resolver: yupResolver(doctorSigninSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignIn = async (data: any) => {
    // console.log(JSON.stringify(data));
    try {
      const response = await axios.post("/api/doctorSignin", data);
      console.log("Response received:", response);

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        console.log("Sign in successfully", token);

        // Decode the JWT token manually to extract the userId
        const decodedToken = decodeJWT(token);
        console.log("Decoded Token:", decodedToken);
        if (decodedToken && decodedToken.userId) {
          const userId = decodedToken.userId;
          const email = data.email;
          console.log("Decoded userId:", userId);

          // Store the token in Redux and localStorage
          dispatch(login({ token, email, userId })); // Storing token in Redux
          dispatch(setUserId(userId)); // Storing userId in Redux

          localStorage.setItem("doctortoken", token);
          localStorage.setItem("doctoruserId", userId); // Store userId in localStorage
          localStorage.setItem("doctorEmail", email);

          reset({ email: "", password: "" });
          // Toast("success", "SignIn successfully");
          navigate("/profile");
          // Toast("success", "Kindly Update your Profile");
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
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password} // Show error state if validation fails
                  helperText={errors.password?.message} // Show error message
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                        {/* Eye icon toggle */}
                      </IconButton>
                    ),
                  }}
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
        <ToastContainer />
      </form>
    </Popover>
  );
};

export default DoctorPopover;
