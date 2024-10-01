import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
  Checkbox,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import googleLogo from "../../assets/logoGoogle.png";
import styles from "../../Styles/adminSignin.module.css";
import axios from "axios";
import { Toast } from "../../components/ToastMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

// Define the shape of form data
interface SignInForm {
  email: string;
  password: string;
}


// Define validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Define the signIn function
const signInWithProvider = async (provider: string) => {

  // Simulate an API call for signing in
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider}`);
      resolve();
    }, 500);
  });
};

const SignIn: React.FC = () => {
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  });

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

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const response = await axios.post("/api/admin-Signin", data);
      console.log("Response received:", response);

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        console.log("Sign in successfully", token);

        // Decode the JWT token manually to extract the userId
        const decodedToken = decodeJWT(token);
        console.log("Decoded Token:", decodedToken);
        if (decodedToken && decodedToken.userId) {
          const userId = decodedToken.userId;
          console.log("Decoded userId:", userId);
          localStorage.setItem("doctortoken", token);
          localStorage.setItem("doctoruserId", userId);

          reset();
          navigate("/admin");
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
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={styles.Paper}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <LockIcon fontSize="large" className={styles.LockiconColor} />
        </Box>
        <Typography variant="h5" align="center">
          Sign In
        </Typography>
        <Typography align="center" className={styles.para}>
          Welcome user, please sign in to continue
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          </Box>
          <Box mb={2} display="flex" alignItems="center">
            <Checkbox {...label} />
            <Typography>Remember me</Typography>
          </Box>

          <Box textAlign="center" marginY={2}>
            <Divider className={styles.divider}>or</Divider>
          </Box>

          {/* Sign In with Google Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            style={{ textTransform: "none", marginBottom: "16px" }}
            onClick={() => signInWithProvider("google")} // Add your sign in logic here
          >
            <img
              src={googleLogo}
              alt="Google"
              style={{ width: "40px", marginRight: "8px" }}
            />
            Sign In with Google
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.signIn}
          >
            Sign In
          </Button>
          <ToastContainer />
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
