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
import doctorimage from "../../assets/Individual-doctor.jpg";
import styles from "../../Styles/doctorSlider.module.css";
// import moment from "moment";
// import { useAppSelector } from "src/store/hooks";
// import { RootState } from "src/store/store";
// import EmployeeChangePassword from "./EmployeeChangePassword";
// import EmployeePersonalInformation from "./EmployeePersonalInformation";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import ReviewsIcon from "@mui/icons-material/Reviews";
import GradeIcon from "@mui/icons-material/Grade";
import StarHalfIcon from "@mui/icons-material/StarHalf";
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
// import FileUploader from "../customDragandDop";
// import InputField from "../TextField";
import Dropzone from "../UploadDropZone";
import axios from "axios";
import BookingForm from "../testingStripe2";
import { useSelector } from "react-redux";
import {
  selectPatientEmail,
  selectIsPatientAuthenticated,
} from "../../store/authPatientSlice";
import { Stepper, Step, StepLabel, Button } from "@mui/material";

const steps = ["Step 1", "Step 2"];

const DoctorDetailsModal = ({ onClick, open, onClose, doctor }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { userInfo }: any = useAppSelector(
  //     (state: RootState) => state.userSlice
  //   );
  console.log("Doctor prop:", doctor);
  const [selectedFile, setSelectedFile] = useState<any>();
  console.log("selectedFile", selectedFile);
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({ resolver: yupResolver(consultationBookingSchema) });

  const [doctorDetails, setDoctorDetails] = useState<any>(doctor);

  React.useEffect(() => {
    if (doctor) {
      console.log("Doctor data in modal:", doctor);
      setDoctorDetails(doctor); // Use doctor data
    }
  }, [doctor]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // const uploadFile = async (evt: any) => {
  //   try {
  //     const allowedFormats = ["jpeg", "jpg", "png", "svg", "pdf", "webp"];
  //     const file = evt.target.files[0];
  //     if (!file) {
  //       return;
  //     }
  //     const fileFormat = file.name.split(".").pop().toLowerCase();
  //     if (!allowedFormats.includes(fileFormat)) {
  //       Toast(
  //         "error",
  //         "Invalid file format. Please upload only JPEG, JPG, PNG, SVG, PDF, or WEBP files."
  //       );
  //       return;
  //     }
  //     const newFormData = new FormData();
  //     newFormData.append("file", evt.target.files[0]);
  //     newFormData.append("hostname", "localhost");
  //     setSelectedFile(newFormData);
  //   } catch (error) {
  //     console.error("Error uploading the file:", error);
  //   }
  // };

  const handleSignup = async (data: any) => {
    console.log(data, "Booking appointment data");
    console.log(JSON.stringify(data));
    try {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        data.images.forEach((image: string | Blob) => {
          formData.append("images", image);
        });
      }

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("prefferDate", data.prefferDate);
      formData.append("nationality", data.nationality);
      formData.append("timezone", data.timezone);
      formData.append("cancertype", data.cancertype);
      formData.append("phone", data.phone);
      formData.append("description", data.description);

      const response = await axios.post("/api/bookingConsultation", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
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
  const handleNext = async (data: any) => {
    if (activeStep === steps.length - 1) {
      await handleSignup(data); // If on the last step, submit the form
    } else {
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
                >
                  <img
                    src={doctorDetails?.imageUrl || "default-image.png"}
                    className={styles.imageDoctor}
                  />
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
                    mb={5}
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
                      {doctorDetails?.charges || "Charges not available"}Per
                      Hour
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
                      <ReviewsIcon
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
                      <GradeIcon />
                      <GradeIcon />
                      <GradeIcon />
                      <GradeIcon />
                      <StarHalfIcon />
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
                      15 Years of Exp
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
                      {activeStep === 0 && (
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
                            />
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
                              defaultValue=""
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <Dropzone
                                    {...field}
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
                      )}
                      {activeStep === 1 && (
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
                              <strong>Service Charges & Tax (30%):</strong>
                              <br />
                              <strong>Total Price:</strong> $
                            </Typography>

                            <p style={{ fontStyle: "italic", color: "gray" }}>
                              The total price includes a 25% service charge and
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
                                doctorName={selectedDoctor.firstName}
                              />
                            )}
                            <Grid mt={5}>
                              <Typography sx={{
                                fontweight:"bold"
                              }}>
                                Patient Email:
                                {patientEmail || "No email found"}
                              </Typography>
                              {/* <h2>
                                {isAuthenticated ? "Yes" : "No"}
                              </h2> */}
                            </Grid>
                          </Grid>
                        </>
                      )}

                      <Grid
                        container
                        item
                        className={styles.submitButtonContainer}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        justifyContent={"center"}
                      >
                        {/* <IconLabelButtons
                          name={"Book Consultation"}
                          type="submit"
                          variant="contained"
                          className={styles.buttons}
                        /> */}
                        <Button
                          disabled={activeStep === 0} // Disable back button on first step
                          onClick={handleBack}
                          variant="outlined"
                        >
                          Back
                        </Button>
                        {activeStep < steps.length - 1 && (
                          <Button
                            type="button"
                            variant="contained"
                            onClick={handleNext}
                          >
                            Next
                          </Button>
                        )}
                        {/* <Button type="submit" variant="contained"
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Submit" : "Next"}
                        </Button> */}
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
