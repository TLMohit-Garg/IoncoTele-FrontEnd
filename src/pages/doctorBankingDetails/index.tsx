import { Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomTextField from "../../components/customTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankinDetailsSchema } from "../../utils/validation";
import { Toast } from "../../components/ToastMessage";
import styles from "../../Styles/doctorRegistrationForm.module.css";
import CustomCheckBox from "../../components/customCheckbox";
import IconLabelButtons from "../../components/CustomButton/Button";

function DoctorBankingDetails() {
  const [checkedbox, setcheckedbox] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({
    resolver: yupResolver(bankinDetailsSchema),
  });

  const handleBankingDetail = async (data: any) => {
    // console.log(JSON.stringify(data));
    try {
      const response = await axios.post("/api/doctorBankingDetail", data);
      if (response.status === 201) {
        console.log(response.data, "doctorBankingDetail successfully");
        Toast("success", "you'r Banking details submitted successfully !");
        reset(); 
      } else {
        Toast("error", "Banking details Submission failed !");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast("error", "An error occurred during Submission Banking details !");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcheckedbox(event.target.checked);
  };
  return (
    <>
    <Grid
    container
    item
    xs={12}
    md={12}
    sm={12}
    lg={12}
    xl={12}
    justifyContent={"space-evenly"}
    >

    <Grid 
    item
        container
        xs={6}
        md={6}
        sm={6}
        lg={6}
        xl={6}
        justifyContent={"space-evenly"}
        className={styles.parentGrid}
      >
        
      </Grid>
      <Grid
      item
        container
        xs={6}
        md={6}
        sm={6}
        lg={6}
        xl={6}
        justifyContent={"space-evenly"}
        className={styles.parentGrid}
      >
        <form onSubmit={handleSubmit(handleBankingDetail)} style={{ width: "100%" }}>
          <Grid container item xs={12} md={12} sm={12} lg={12} xl={12}>
            <Typography className={styles.registrationformHeading}>
              DoctorBankingDetails
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
            mt={3}
            justifyContent={"space-between"}
          >
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.fullName)}
                errorCondition={
                  errors.fullName && (
                    <Typography className={styles.errorMsg}>
                      {errors.fullName.message}
                    </Typography>
                  )
                }
                control={control}
                name="fullName"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Full Name"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.speciality)}
                errorCondition={
                  errors.speciality && (
                    <Typography className={styles.errorMsg}>
                      {errors.speciality.message}
                    </Typography>
                  )
                }
                control={control}
                name="speciality"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Speciality"
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
                error={Boolean(errors.description)}
                errorCondition={
                  errors.description && (
                    <Typography className={styles.errorMsg}>
                      {errors.description.message}
                    </Typography>
                  )
                }
                control={control}
                name="description"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Description"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.experience)}
                errorCondition={
                  errors.experience && (
                    <Typography className={styles.errorMsg}>
                      {errors.experience.message}
                    </Typography>
                  )
                }
                control={control}
                name="experience"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Experience"
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
                error={Boolean(errors.consultationCharges)}
                errorCondition={
                  errors.consultationCharges && (
                    <Typography className={styles.errorMsg}>
                      {errors.consultationCharges.message}
                    </Typography>
                  )
                }
                control={control}
                name="consultationCharges"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Consultation Charges $"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
            <CustomTextField
                error={Boolean(errors.accountName)}
                errorCondition={
                  errors.accountName && (
                    <Typography className={styles.errorMsg}>
                      {errors.accountName.message}
                    </Typography>
                  )
                }
                control={control}
                name="accountName"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Account Name"
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
              <CustomTextField
                error={Boolean(errors.bankName)}
                errorCondition={
                  errors.bankName && (
                    <Typography className={styles.errorMsg}>
                      {errors.bankName.message}
                    </Typography>
                  )
                }
                control={control}
                name="bankName"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Bank Name"
              />
            </Grid>
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.bankAddress)}
                errorCondition={
                  errors.bankAddress && (
                    <Typography className={styles.errorMsg}>
                      {errors.bankAddress.message}
                    </Typography>
                  )
                }
                control={control}
                name="bankAddress"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Bank address"
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
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
            <CustomTextField
                error={Boolean(errors.bankAccountNumber)}
                errorCondition={
                  errors.bankAccountNumber && (
                    <Typography className={styles.errorMsg}>
                      {errors.bankAccountNumber.message}
                    </Typography>
                  )
                }
                control={control}
                name="bankAccountNumber"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Bank Account Number"
              />
            </Grid>
            <Grid
              container item xs={12} md={5} sm={12} lg={5} xl={5}
            >
              <CustomTextField
                error={Boolean(errors.branchCodeIFSC)}
                errorCondition={
                  errors.branchCodeIFSC && (
                    <Typography className={styles.errorMsg}>
                      {errors.branchCodeIFSC.message}
                    </Typography>
                  )
                }
                control={control}
                name="branchCodeIFSC"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Branch Code [IFSC / Routing code]"
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
             xs={12} md={5} sm={12} lg={5} xl={5}
            mt={3}
            justifyContent={"space-between"}
            className={styles.phoneContainer}
          >
           <CustomTextField
                error={Boolean(errors.bankAccountNumberIBAN)}
                errorCondition={
                  errors.bankAccountNumberIBAN && (
                    <Typography className={styles.errorMsg}>
                      {errors.bankAccountNumberIBAN.message}
                    </Typography>
                  )
                }
                control={control}
                name="bankAccountNumberIBAN"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Bank Account number [IBAN]"
              /> 
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
              name="SUBMIT"
              className={styles.submitBtn}
              type="submit"
            />
          </Grid>
          {/* <ToastContainer /> */}
        </form>
      </Grid>
    </Grid>

    </>
  );
}

export default DoctorBankingDetails;
