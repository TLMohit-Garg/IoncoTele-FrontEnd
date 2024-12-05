import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Divider,
  Typography,
  Card,
  CardContent,
  TextareaAutosize,
} from "@mui/material";
import FullScreenDialog from "../sliderModal";
import styles from "../../Styles/doctorSlider.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CustomTextField from "../customTextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { consultationBookingSchema } from "../../utils/validation";
import CustomSelect from "../customSelect";
import perInfoData from "./data.json";
import PhoneInput from "../phoneInput";
import { Toast } from "../ToastMessage";
import IconLabelButtons from "../CustomButton/Button";
import CustomDatePicker from "../customDatePicker";
import Dropzone from "../UploadDropZone";
import axios from "axios";
import BookingForm from "../testingStripe2";
import { useSelector } from "react-redux";
import {
  selectPatientEmail,
  selectIsPatientAuthenticated,
} from "../../store/authPatientSlice";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";


const steps = ["Step 1", "Step 2"];
// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51PyXQuRpCokjQ3Hx01o9Lo3Wke6XgBla6JjgpOFAlalN3D4iuEndRJw8m2ifuXEC46IZ2hWtGveO44rmxKHfNQlJ00mF0DJqd0"
  // "pk_live_51Q3bltA8kzNiYMNTljp2tSqfgkoWuM2Fi667Xdlvts1JABnvKnzvh1795SBDnMZAIn3yUZlB0Kkl0VbxrmViVSgh007yj5Qtay"
); 

const DoctorDetailsModal = ({ onClick, open, onClose, doctor }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { userInfo }: any = useAppSelector(
  //     (state: RootState) => state.userSlice
  //   );
  const userId = doctor.userId?._id;
  console.log("Doctor prop parent prop:", userId);
  // console.log("Doctor prop:", doctor.userId?._id);
  console.log("Doctor prop with id:", doctor._id);
  console.log("Doctor prop with title:", doctor.title);
  console.log("Doctor prop with charges:", doctor.charges);
  console.log("Doctor prop with preferredCurrency:", doctor.preferredCurrency);
  console.log("Doctor prop with id:", doctor._id);
  console.log("Doctor prop with email:", doctor.userId?.email);
  const [selectedFile, setSelectedFile] = useState<any>();
  console.log("selectedFile", selectedFile);
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({ resolver: yupResolver(consultationBookingSchema) });

  const [doctorDetails, setDoctorDetails] = useState<any>(userId);

  React.useEffect(() => {
    if (userId) {
      console.log("Doctor data in modal:", userId);
      setDoctorDetails(doctor); // Use doctor data
    }
  }, [userId]);

  const handleSignup = async (data: any) => {
    console.log(data, "Booking appointment data");
    console.log(JSON.stringify(data));
    try {
      const formData = new FormData();
       // Append uploaded images
      // if (data.images && data.images.length > 0) {
      //   data.images.forEach((image: string | Blob) => {
      //     formData.append("images", image);
      //   });
      // }
      data.images.forEach((file: File) => {
        formData.append("images", file);
    });

      // Append form fields
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("prefferDate", data.prefferDate);
      formData.append("nationality", data.nationality);
      formData.append("timezone", data.timezone);
      formData.append("cancertype", data.cancertype);
      formData.append("phone", data.phone);
      formData.append("description", data.description);

      // Append doctorId from props
      // formData.append("doctorId", doctor?.userId?._id); // Add doctorId here
      formData.append("doctorId", doctor?._id); // Add doctorId here
      formData.append("doctorName", doctor?.title); 
      formData.append("doctorPrice", doctor?.charges); 
      formData.append("preferredCurrency", doctor?.preferredCurrency); 

      console.log("FormData before API call:", formData);
      // const response = await axios.post("/api/bookingConsultation/createConsultation", formData, {
      const response = await axios.post("/api/tempBookingConsultation/createTempConsultation", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url, sessionId } = response.data;

      console.log("Stripe Checkout Session created successfully:", response.data);

      // Redirect to Stripe Checkout
      if (url) {
      window.location.href = url; 
      }

      // Redirect to the Stripe Checkout session
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error("Stripe Checkout redirection error:", result.error.message);
        }
      }

      if (response.status === 201) {
        console.log("Booking Consultation API Response:", response.data);
        Toast("success", "Congratulations! You have booked your consultation.");
        reset();
        setActiveStep(0); // Reset to the first step after submission
      } else {
        Toast("error", "Booking consultation failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast("error", "An error occurred during signup!");
    }
  };
  // Handle form submission and step transition
  const handleNext = async () => {
    console.log("Active Step:", activeStep);
    console.log("Steps Length - 1:", steps.length - 1);

    if (activeStep === steps.length - 1) {
      console.log("On last step, calling handleSignup...");
      // await handleSignup(data); // If on the last step, submit the form
      await handleSubmit(handleSignup)();
    } else {
      console.log("Moving to the next step...");
      setActiveStep((prev) => prev + 1); // Move to the next step
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1); // Move to the previous step
      reset(); // Reset form on back button press
    }
  };
  const selectedDoctor = useSelector(
    (state: any) => state.doctor.selectedDoctor
  );

  const patientEmail = useSelector(selectPatientEmail);
  // const patientEmail = useSelector((state: any) => state.user.email);
  const isAuthenticated = useSelector(selectIsPatientAuthenticated);
  console.log("Patient Email:", patientEmail);
  console.log("Selected Doctor:", selectedDoctor);
  console.log("Selected Doctor with id:", selectedDoctor?.userId._id);

  React.useEffect(() => {
    console.log("Patient Email from Redux:", patientEmail);
    console.log("Is Patient Authenticated:", isAuthenticated);
  }, [patientEmail, isAuthenticated]);
  return (
    <>
      <FullScreenDialog
        onClick={onClick}
        open={open}
        direction="left"
        onClose={onClose}
        className={styles.mainSection}
        dialogClassName={styles.employeeDetailsDialog}
        PaperProps={{
          className: styles.profileMainWrapper,
        }}
        content={
          <Grid className={styles.modalContent}>
            <Grid
              container
              item
              xs={12}
              md={12}
              sm={12}
              lg={12}
              xl={12}
              pt={4}
              justifyContent={"space-between"}
              style={{
                position: "fixed",
                top: 0,
                zIndex: 1,
                background: "white",
                height: "100px",
                width: "67%",
              }}
            >
              <Grid
                item
                container
                xs={6}
                md={6}
                sm={6}
                lg={6}
                xl={6}
                className={styles.arrow}
                justifyContent={"Left"}
              >
                <Typography className={styles.textDoctor}>
                  Doctor Profile
                </Typography>
              </Grid>
              <Grid
                container
                item
                md={6}
                sm={6}
                xs={6}
                xl={6}
                lg={6}
                justifyContent={"end"}
                className={styles.closeIcon}
              >
                <CloseIcon className={styles.closeIcon} onClick={onClose} />
              </Grid>
              <Divider className={styles.divider} />
            </Grid>

            <Grid
              container
              xs={12}
              md={12}
              sm={12}
              lg={12}
              xl={12}
              className={styles.userProfileSection}
            >
              {/* left Container starts here*/}
              <Grid
                container
                item
                xs={6}
                md={6}
                sm={6}
                lg={6}
                xl={6}
                className={styles.leftContainer}
                justifyContent={"center"}
                mt={12}
              >
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  sm={12}
                  lg={12}
                  xl={12}
                  justifyContent={"center"}
                  className={styles.imageContainer}
                  mb={5}
                >
                  <img
                    src={doctorDetails?.imageUrl || "default-image.png"}
                    className={styles.imageDoctor}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={5}
                  md={5}
                  sm={5}
                  lg={11}
                  xl={11}
                  justifyContent={"center"}
                  spacing={2}
                  className={styles.infoContainer}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    justifyContent={"center"}
                  >
                    <Typography className={styles.doctorName}>
                      {doctorDetails?.title || "Doctor name is not Available"}
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
                    justifyContent={"center"}
                    // mb={5}
                  >
                    <Typography className={styles.doctorSpeciality}>
                      {doctorDetails?.speciality ||
                        "Doctor speciality not Available"}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    md={10}
                    sm={10}
                    lg={10}
                    xl={10}
                    justifyContent={"center"}
                    mb={3}
                  >
                    <Typography className={styles.doctorDescription}>
                      {doctorDetails?.description ||
                        "Doctor description not Available"}
                    </Typography>
                  </Grid>
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
                  justifyContent={"center"}
                  className={styles.secondContainer}
                >
                  <Grid
                    container
                    item
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={6}
                    justifyContent={"center"}
                  >
                    <Grid
                      container
                      item
                      justifyContent={"center"}
                      alignItems={"start"}
                      className={styles.consultationDone}
                      xs={4}
                      md={4}
                      sm={4}
                      lg={4}
                      xl={4}
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: "58px",
                          margin: "5px, 9px, 5px, 12px",
                          color: "#10a0bd",
                        }}
                      />
                    </Grid>

                    <Grid
                      container
                      item
                      justifyContent={"left"}
                      alignItems={"start"}
                      pt={1}
                      xs={7}
                      md={7}
                      sm={7}
                      lg={7}
                      xl={7}
                      className={styles.consultationText}
                    >
                      120 Consultaion done
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={6}
                    justifyContent={"center"}
                  >
                    <Grid
                      container
                      item
                      justifyContent={"center"}
                      alignItems={"start"}
                      className={styles.consultationDone}
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      xl={3}
                    >
                      {/* <Typography className={styles.consultationCharges}> */}
                      <MonetizationOnIcon
                        sx={{
                          fontSize: "58px",
                          margin: "5px, 9px, 5px, 12px",
                          color: "#10a0bd",
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      justifyContent={"left"}
                      alignItems={"start"}
                      pt={1}
                      xs={9}
                      md={9}
                      sm={9}
                      lg={9}
                      xl={9}
                      className={styles.consultationText}
                    >
                      {doctorDetails?.charges || "Charges not available"}
                      Per Consultation
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={6}
                    justifyContent={"center"}
                  >
                    <Grid
                      container
                      item
                      justifyContent={"center"}
                      alignItems={"start"}
                      className={styles.consultationDone}
                      xs={4}
                      md={4}
                      sm={4}
                      lg={4}
                      xl={4}
                    >
                      <SchoolIcon
                        sx={{
                          fontSize: "58px",
                          margin: "5px, 9px, 5px, 12px",
                          color: "#10a0bd",
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      justifyContent={"left"}
                      alignItems={"start"}
                      pt={1}
                      xs={7}
                      md={7}
                      sm={7}
                      lg={7}
                      xl={7}
                      className={styles.consultationText}
                    >
                      {doctorDetails?.qualification ||
                        "Qualification not found"}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={6}
                    justifyContent={"center"}
                  >
                    <Grid
                      container
                      item
                      justifyContent={"start"}
                      alignItems={"start"}
                      className={styles.consultationDone}
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      xl={3}
                    >
                      <WorkIcon
                        sx={{
                          fontSize: "58px",
                          margin: "5px, 9px, 5px, 12px",
                          color: "#10a0bd",
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      justifyContent={"left"}
                      alignItems={"start"}
                      pt={1}
                      xs={9}
                      md={9}
                      sm={9}
                      lg={9}
                      xl={9}
                      className={styles.consultationText}
                    >
                      {doctorDetails?.workExperience || "No work exp found"}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* left Container ends here*/}

              {/* right Container starts here*/}
              <Grid
                container
                item
                xs={6}
                md={6}
                sm={6}
                lg={6}
                xl={6}
                className={styles.rightContainer}
                justifyContent={"center"}
                mt={12}
              >
                <Card className={styles.bookingContainer}>
                  <CardContent>
                    <form onSubmit={handleSubmit(handleSignup)}>
                      <Typography className={styles.text}>
                        Book Consultation Now
                      </Typography>
                      <Divider className={styles.formdivider} />
                      {/* {activeStep === 0 && ( */}
                        <>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Full Name
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.fullNameContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
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
                              placeholder="Enter your full name"
                            />
                          </Grid>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Email
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.emailContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
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
                              placeholder="Email Address"
                            />
                          </Grid>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Date & Time
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.nationalityContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                          {/* {doctor && doctor.userId ? ( */}
                            <CustomDatePicker
                              error={Boolean(errors.prefferDate)}
                              errorCondition={
                                errors.prefferDate && (
                                  <Typography className={styles.errorMsg}>
                                    {errors.prefferDate.message}
                                  </Typography>
                                )
                              }
                              control={control}
                              name="prefferDate"
                              showTimePicker={true}
                              className={styles.datefieldContainer}
                              doctorId={userId}
                            />
                          {/* ):(<p>Loading doctor details...</p>)} */}
                          </Grid>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Nationality
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.nationalityContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
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
                              fullWidth={true}
                              className={styles.customSelect}
                            />
                          </Grid>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Time Zone
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.timezoneContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <CustomSelect
                              error={Boolean(errors.timezone)}
                              errorCondition={
                                errors.timezone && (
                                  <Typography className={styles.errorMsg}>
                                    {errors.timezone.message}
                                  </Typography>
                                )
                              }
                              control={control}
                              name="timezone"
                              selectData={perInfoData.timezone}
                              placeHolder="Select your timezone"
                              selectFieldCss={styles.selectField}
                              fullWidth={true}
                              className={styles.customSelect}
                            />
                          </Grid>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Phone number
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.timezoneContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <PhoneInput
                              name="phone"
                              control={control}
                              error={Boolean(errors?.phone)}
                              containerClass={styles.containerPhn}
                              inputClass={`${styles.inputPhn} ${
                                Boolean(errors?.phone) ? styles.errorBorder : ""
                              }`}
                              placeholder="+91-8050656794"
                              helperText={errors?.phone?.message}
                            />
                          </Grid>

                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Upload file(Doctor Prescription's etc...)
                            </Typography>
                          </Grid>

                          <Grid
                            container
                            item
                            className={styles.timezoneContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            {/* <FileUploader
                          name="files"
                          acceptedFileTypes={[
                            "image/jpeg",
                            "image/png",
                            "application/pdf",
                            "image/svg+xml",
                            "image/webp",
                          ]}
                          maxFiles={10}
                          placeholder="Upload file(s)"
                        /> */}
                            {/* <InputField
                          type="file"
                          size="medium"
                          error={errors.documentName !== undefined}
                          helperText={
                            errors.documentName
                              ? "Please upload a document"
                              : ""
                          }
                          onChange={(
                            event: any
                          ) => uploadFile(event)}
                          multiple 
                        /> */}
                            <Controller
                              control={control}
                              name="images"
                              defaultValue={[]}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <Dropzone
                                    // {...field}
                                    onChange={field.onChange}
                                    //  onFileDrop={uploadFile}
                                  />
                                  {error && (
                                    <Typography
                                      color="error"
                                      className={styles.errorMsg}
                                      sx={{ fontSize: "12px" }}
                                    >
                                      Please select the images
                                    </Typography>
                                  )}
                                </>
                              )}
                            />
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.timezoneContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <Typography className={styles.inputHeading}>
                              Upload File (
                              <span style={{ fontWeight: "normal" }}>
                                Jpeg, Jpg, Png, SVG, Pdf, Webp
                              </span>
                              )
                            </Typography>
                          </Grid>
                          <Grid className={styles.fullName}>
                            <Typography className={styles.fullNameTypo}>
                              Reason for consultation
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            className={styles.timezoneContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <Controller
                              control={control}
                              name="description"
                              defaultValue=""
                              rules={{
                                required: true,
                                maxLength: 60,
                                pattern: /^[a-zA-Z ]*$/,
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <TextareaAutosize
                                    minRows={8}
                                    maxRows={10}
                                    {...field}
                                    className={styles.textArea}
                                  />

                                  {error && (
                                    <Typography
                                      color="error"
                                      className={styles.errorMsg}
                                      sx={{ fontSize: "12px" }}
                                    >
                                      Please enter a description (max 60
                                      characters)
                                    </Typography>
                                  )}
                                </>
                              )}
                            />
                          </Grid>
                        </>
                      {/* )} */}
                      {/* {activeStep === 1 && (
                        <>
                          <Grid
                            container
                            item
                            spacing={2}
                            className={styles.paymentgatewayContainer}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            pt={5}
                            mt={3}
                          >
                            <Typography variant="body1">
                              <strong>Service Charges & Tax (15%):</strong>
                              <br />
                              <strong>Total Price:</strong> $
                            </Typography>

                            <p style={{ fontStyle: "italic", color: "gray" }}>
                              The total price includes a 15% service charge and
                              tax.
                            </p>
                            {selectedDoctor && (
                              <BookingForm
                                patientEmail={
                                  typeof patientEmail === "object"
                                    ? patientEmail.email
                                    : patientEmail
                                }
                                //  patientEmail={patientEmail.email || "loading"}
                                doctorPrice={selectedDoctor.charges}
                                doctorName={selectedDoctor.title}
                              />
                            )}
                            <Grid mt={5}>
                              <Typography
                                sx={{
                                  fontweight: "bold",
                                }}
                              >
                                Patient Email:
                                {patientEmail || "No email found"}
                              </Typography>
                              {/* <h2>
                                {isAuthenticated ? "Yes" : "No"}
                              </h2> 
                            </Grid>
                          </Grid>
                        </>
                      )} */}

                      <Grid
                        container
                        item
                        className={styles.submitButtonContainer}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        justifyContent={"space-evenly"}
                      >
                        {/* <IconLabelButtons
                          name={"Book Consultation"}
                          type="submit"
                          variant="contained"
                          className={styles.buttons}
                        /> */}


                        {/* <Button
                          disabled={activeStep === 0} // Disable back button on first step
                          onClick={handleBack}
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "40px 0px 20px 0px" }}
                        >
                          Back
                        </Button>
                        {activeStep < steps.length - 1 && (
                          <Button
                            type="button"
                            variant="contained"
                            onClick={handleSubmit(handleNext)}
                            fullWidth
                            sx={{marginBottom:"5px", paddingBottom:"10px"}}
                          >
                            Next
                          </Button>
                        )} */}
                         {/* {activeStep === steps.length - 1 && ( */}
                        <Button type="button" variant="contained" fullWidth onClick={handleSubmit(handleSignup)}>
                               Book Consultation
                        </Button>
                            {/* )} */}
                       
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              {/* right Container ends here*/}
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default DoctorDetailsModal;
