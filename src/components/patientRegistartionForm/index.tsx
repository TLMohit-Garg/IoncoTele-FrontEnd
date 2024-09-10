import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPatientSchema } from "../../utils/validation";
import CustomTextField from "../customTextField";
import CustomSelect from "../customSelect";
import perInfoData from "../infoDataJSON/userData.json";
import PhoneInput from "../phoneInput";
import IconLabelButtons from "../CustomButton/Button";
import { Toast } from "../ToastMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../Styles/patientSignup.module.css";
import axios from "axios";
import consultationImage from "../../assets/ConsultationImage.jpg";
import CustomCheckBox from "../customCheckbox";
import React from "react";

export default function PatientSignup() {
  const [checkedbox, setcheckedbox] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({
    resolver: yupResolver(createPatientSchema),
  });

  const handleSignup = async (data: any) => {
    console.log(JSON.stringify(data));
    try {
      const response = await axios.post("/api/patientSignup", data);
      if (response.status === 201) {
        console.log(response.data, "Signup successfully");
        Toast("success", "Signup successful!");
        reset(); // Reset the form fields
      } else {
        Toast("error", "Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast("error", "An error occurred during signup!");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcheckedbox(event.target.checked);
  };

  return (
    <Grid
      container
      xs={12}
      md={12}
      sm={12}
      lg={12}
      xl={12}
      justifyContent={"space-evenly"}
      className={styles.parentGrid}
    >
      <Grid
        container
        item
        xs={5}
        md={5}
        sm={5}
        lg={5}
        xl={5}
        sx={{ background: "lightGrey" }}
      >
        <img src={consultationImage} className={styles.consultationImg} />
      </Grid>
      <Grid
        container
        item
        xs={5}
        md={5}
        sm={5}
        lg={5}
        xl={5}
        className={styles.parentContainer}
      >
        <form onSubmit={handleSubmit(handleSignup)} style={{ width: "100%" }}>
          <Grid container item xs={12} md={12} sm={12} lg={12} xl={12}>
            <Typography className={styles.registrationformHeading}>
              Registration Form
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            mt={7}
            justifyContent={"space-between"}
          >
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.firstName)}
                errorCondition={
                  errors.firstName && (
                    <Typography className={styles.errorMsg}>
                      {errors.firstName.message}
                    </Typography>
                  )
                }
                control={control}
                name="firstName"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="First Name"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.lastName)}
                errorCondition={
                  errors.lastName && (
                    <Typography className={styles.errorMsg}>
                      {errors.lastName.message}
                    </Typography>
                  )
                }
                control={control}
                name="lastName"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Last Name"
              />
            </Grid>
          </Grid>

          {/* Second Row start */}
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            mt={3}
            justifyContent={"space-between"}
          >
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.password)}
                errorCondition={
                  errors.password && (
                    <Typography className={styles.errorMsg}>
                      {errors.password.message}
                    </Typography>
                  )
                }
                control={control}
                name="password"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Password"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.confirmPassword)}
                errorCondition={
                  errors.confirmPassword && (
                    <Typography className={styles.errorMsg}>
                      {errors.confirmPassword.message}
                    </Typography>
                  )
                }
                control={control}
                name="confirmPassword"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Confirm Password"
              />
            </Grid>
          </Grid>

          {/* Third Row start */}
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            mt={3}
            justifyContent={"space-between"}
          >
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.email)}
                errorCondition={
                  errors.email && (
                    <Typography className={styles.errorMsg}>
                      {errors.email.message}
                    </Typography>
                  )
                }
                control={control}
                name="email"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Email"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.age)}
                errorCondition={
                  errors.age && (
                    <Typography className={styles.errorMsg}>
                      {errors.age.message}
                    </Typography>
                  )
                }
                control={control}
                name="age"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Age"
              />
            </Grid>
          </Grid>

          {/* Fourth Row start */}
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            mt={3}
            justifyContent={"space-between"}
          >
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomSelect
                error={Boolean(errors.nationality)}
                errorCondition={
                  errors.nationality && (
                    <Typography className={styles.errorMsg}>
                      {errors.nationality.message}
                    </Typography>
                  )
                }
                control={control}
                name="nationality"
                selectData={perInfoData.nationality}
                placeHolder="Select nationality"
                selectFieldCss={styles.selectField}
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomSelect
                error={Boolean(errors.gender)}
                errorCondition={
                  errors.gender && (
                    <Typography className={styles.errorMsg}>
                      {errors.gender.message}
                    </Typography>
                  )
                }
                control={control}
                name="gender"
                selectData={perInfoData.gender}
                placeHolder="Select Gender"
                selectFieldCss={styles.selectField}
                // fullWidth={true}
                // sx={{width:"100%"}}
              />
            </Grid>
          </Grid>

          {/* Fifth Row start */}
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            mt={3}
            justifyContent={"space-between"}
            className={styles.phoneContainer}
          >
            <Grid item xs={6} md={6} sm={6} lg={6} xl={6}>
              <PhoneInput
                control={control}
                name="phone"
                error={Boolean(errors?.phone)}
                containerClass={styles.containerPhn}
                inputClass={`${styles.inputPhn} ${
                  Boolean(errors?.phone) ? styles.errorBorder : ""
                }`}
                placeholder="+91-8050656794"
                helperText={errors?.phone?.message}
              />
            </Grid>
          </Grid>
          {/* Sixth Row start */}
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            mt={5}
            justifyContent={"start"}
            className={styles.checkboxContainer}
          >
            <Grid item xs={1} md={1} sm={1} lg={1} xl={1}>
              <CustomCheckBox
                checked={checkedbox}
                handleChange={handleChange}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent={"start"}
              xs={8}
              md={8}
              sm={8}
              lg={8}
              xl={8}
              pt={1}
            >
              <Typography className={styles.checkboxText}>
                I have read and accepted Terms and Conditions and the Privacy
                Policy , and I wish to receive the Top Doctors Newsletter and
                Online Magazine on Top Doctors.
              </Typography>
            </Grid>
          </Grid>
          <Grid mt={3} container justifyContent={"flex-end"}>
            <IconLabelButtons
              name="CREATE MY ACCOUNT"
              className={styles.submitBtn}
              type="submit"
            />
          </Grid>
          <ToastContainer />
        </form>
      </Grid>
    </Grid>
  );
}
