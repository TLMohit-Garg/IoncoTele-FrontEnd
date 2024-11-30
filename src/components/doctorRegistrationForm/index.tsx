/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import styles from "../../Styles/doctorRegistrationForm.module.css";
import CustomTextField from "../customTextField";
import CustomSelect from "../customSelect";
import PhoneInput from "../phoneInput";
import IconLabelButtons from "../CustomButton/Button";
import { ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { createDoctorsSchema } from "../../utils/validation";
import perInfoData from "../infoDataJSON/userData.json";
import InputFileUpload from "../CustomFileuploadBtn";
import CustomCheckBox from "../customCheckbox";
import { Toast } from "../ToastMessage";
import consultationImage from "../../assets/portrait-smiling-young-doctors-standing.png";
import ConfirmationPopup from "../confirmationPopup";

const DoctorSignup: React.FC = () => {
  const [checkedbox, setCheckedbox] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({
    resolver: yupResolver(createDoctorsSchema),
  });

  const handleSignup = async (data: any) => {
    // console.log(JSON.stringify(data));
    try {
      const response = await axios.post("/api/doctorsignup", data);
      if (response.status === 201) {
        console.log(response.data, "Signup successfully");
        Toast("success", "you have signup successful!");
        reset(); // Reset the form fields
      } else {
        Toast("error", "Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast("error", "An error occurred during signup!");
    }
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedbox(event.target.checked);
  // };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleConfirm = () => {
    console.log("Confirmed!  & Agreed");
    setCheckedbox(!checkedbox);
    setDialogOpen(false);
  };
  return (
    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   style={{ display: "flex", flexDirection: "column", gap: 5 }}
    // >
    //   <div>
    //     <label>First Name</label>
    //     <input
    //       {...register("name", { required: "First Name is required" })}
    //     />
    //     {errors.name && (
    //       <p style={{ color: "orangered" }}>{errors.name.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label>price</label>
    //     <input
    //       type="number"
    //       {...register("price", { required: "price is required" })}
    //     />
    //     {errors.price && (
    //       <p style={{ color: "orangered" }}>{errors.price.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label>quantity</label>
    //     <input
    //       type="number"
    //       {...register("quantity", {
    //         required: "quantity is required",
    //         // pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
    //       })}
    //     />
    //     {errors.quantity && (
    //       <p style={{ color: "orangered" }}>{errors.quantity.message}</p>
    //     )}
    //   </div>

    //   {/* <div>
    //     <label>Age</label>
    //     <input
    //       type="number"
    //       {...register("age", {
    //         required: "Age is required",
    //         min: { value: 18, message: "You must be at least 18 years old" },
    //       })}
    //     />
    //     {errors.age && (
    //       <p style={{ color: "orangered" }}>{errors.age.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label>Gender</label>
    //     <select {...register("gender", { required: "Gender is required" })}>
    //       <option value="">Select...</option>
    //       <option value="male">Male</option>
    //       <option value="female">Female</option>
    //       <option value="other">Other</option>
    //     </select>
    //     {errors.gender && (
    //       <p style={{ color: "orangered" }}>{errors.gender.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label>Address</label>

    //     <input
    //       {...register("address.city", { required: "City is required" })}
    //       placeholder="City"
    //     />
    //     {errors.address?.city && (
    //       <p style={{ color: "orangered" }}>{errors.address.city.message}</p>
    //     )}

    //     <input
    //       {...register("address.state", { required: "State is required" })}
    //       placeholder="State"
    //     />
    //     {errors.address?.state && (
    //       <p style={{ color: "orangered" }}>{errors.address.state.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label>Hobbies</label>
    //     {fields.map((item, index) => (
    //       <div key={item.id}>
    //         <input
    //           {...register(`hobbies.${index}.name`, {
    //             required: "Hobby name is required",
    //           })}
    //           placeholder="Hobby Name"
    //         />
    //         {errors.hobbies?.[index]?.name && (
    //           <p style={{ color: "orangered" }}>
    //             {errors.hobbies[index].name.message}
    //           </p>
    //         )}

    //         {fields.length > 1 && (
    //           <button type="button" onClick={() => remove(index)}>
    //             Remove Hobby
    //           </button>
    //         )}
    //       </div>
    //     ))}
    //     <button type="button" onClick={() => append({ name: "" })}>
    //       Add Hobby
    //     </button>
    //   </div>

    //   <div>
    //     <label htmlFor="sub">Subscribe to Newsletter</label>
    //     <input type="checkbox" id="sub" {...register("subscribe")} />
    //   </div>

    //   {getValues("subscribe") && (
    //     <div>
    //       <label>Referral Source</label>
    //       <input
    //         {...register("referral", {
    //           required: "Referral source is required if subscribing",
    //         })}
    //         placeholder="How did you hear about us?"
    //       />
    //       {errors.referral && (
    //         <p style={{ color: "orangered" }}>{errors.referral.message}</p>
    //       )}
    //     </div>
    //   )} */}

    //   {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

    //   <button type="submit" disabled={isSubmitting}>
    //     {isSubmitting ? "Submitting..." : "Submit"}
    //   </button>
    // </form>
    <Grid
      container
      xs={12}
      md={12}
      sm={12}
      lg={12}
      xl={12}
      justifyContent={"space-evenly"}
      className={styles.parentGrid}
      mt={5}
      mb={5}
    >
      <Grid
        container
        item
        xs={5}
        md={5}
        sm={5}
        lg={5}
        xl={5}
        className={styles.consultationImgGrid}
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
            mt={3}
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
                name="phone"
                control={control}
                error={Boolean(errors?.phone)}
                containerClass={styles.containerPhn}
                inputClass={`${styles.inputPhn} ${
                  Boolean(errors?.phone) ? styles.errorBorder : ""
                }`}
                placeholder="+91-9876543219"
                helperText={errors?.phone?.message}
              />
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
              {/* <InputFileUpload /> */}
              {/* <Typography>Attach File</Typography> */}
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
            mt={3}
            justifyContent={"space-between"}
          >
            <Grid container item xs={12} md={5} sm={12} lg={5} xl={5}>
              <CustomTextField
                error={Boolean(errors.charges)}
                errorCondition={
                  errors.charges && (
                    <Typography className={styles.errorMsg}>
                      {errors.charges.message}
                    </Typography>
                  )
                }
                control={control}
                name="charges"
                fullWidth={true}
                className={styles.fieldContainer}
                placeholder="Hourly Charges"
              />
            </Grid>
          </Grid>

          {/* Seventh Row start */}
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
              <CustomCheckBox checked={checkedbox} onClick={handleOpenDialog} />
              <ConfirmationPopup
                open={dialogOpen}
                onClose={handleCloseDialog}
                title="Please Accept our Term & Conditions"
                content=" Read this carefully and then aggred with our rules & Policies.

               1. The website www.ioncosolutions.com is intended to provide the platform for the cancer
                  patients and the leading oncologists of various specialties. The platform serves as an
intermediary in booking appointments between the user(s) and the doctor(s)/ medical
practitioner(s). It also provides the information for our business clients (Private cancer
hospitals/units and Government Hospitals Trusts) worldwide to serve remote radiotherapy
planning services.

2. Selecting a doctor(s)/medical practitioner(s) for cancer treatment is an important decision
and that should not be based solely on advertising or listings on this website.

3. iOncology Solutions is the name of a professional entity and is not a title or nickname that is
bestowed upon a doctor(s). Therefore, its advertisements do not certify or designate a
physician as a specialist.

4. It is not asserted that the quality of the medical services provided by the doctor(s)/medical
practitioner(s) listed on this website is greater than those of other licensed
doctor(s)/medicalmpractitioner(s) in the field of oncology, and past results do not guarantee
future success.
"
                text="For more details regarding privacy policy, term & condition 
and refund policy Please visit our Footer section"
                onConfirm={handleConfirm}
                onCancel={handleCloseDialog}
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
                Click here to agree with our term & Conditions.
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
          {/* <ToastContainer /> */}
        </form>
      </Grid>
    </Grid>
  );
};

export default DoctorSignup;
