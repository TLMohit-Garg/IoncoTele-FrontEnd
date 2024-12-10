import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import patientImage from "../../assets/doc8.png";
import Divider from "@mui/material/Divider";
import styles from "/src/Styles/patientProfile.module.css";
import axios from "axios";
import { patientProfileTypes } from "../../customDataTypes/datatypes";
import { bankingDetailsTypes } from "../../customDataTypes/datatypes";
import { doctorProfileDataTypes } from "../../customDataTypes/datatypes";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../store/userSlice";
import { RootState } from "../../store/store";
import IconLabelButtons from "../CustomButton/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Toast } from "../ToastMessage";
import {
  selectDoctorUserId,
  selectDoctorToken,
  setDoctorUserData,
  selectDoctorUserData,
} from "../../store/authDoctorSlice";
import DoctorAvailability from "../setAvailability";

function DoctorProfile() {
  const userId = useSelector(selectDoctorUserId);
  const token = useSelector(selectDoctorToken);

  const dispatch = useDispatch();
  const userData = useSelector(selectDoctorUserData);
  // const bankingDetail = useSelector(selectDoctorBankingDetail);
  // const userId = useSelector((state: RootState) => state.user.userId);
  // const token = useSelector((state: RootState) => state.authDoctor.token);
  // const [userData, setuserData] = React.useState<patientProfileTypes>();
  const [profileData, setProfileData] =
    React.useState<doctorProfileDataTypes>();
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [formDataProfile, setFormDataProfile] =
    React.useState<doctorProfileDataTypes>({
      title: profileData?.title || "",
      speciality: profileData?.speciality || "",
      description: profileData?.description || "",
      charges: profileData?.charges || "",
      country: profileData?.country || "",
      imageUrl: profileData?.imageUrl || "",
      preferredCurrency: profileData?.preferredCurrency || "",
    });
  const [bankingDetail, setBankingDetail] =
    React.useState<bankingDetailsTypes>();
  const [loading, setLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<bankingDetailsTypes>({
    fullName: bankingDetail?.fullName || "",
    accountName: bankingDetail?.accountName || "",
    bankName: bankingDetail?.bankName || "",
    bankAccountNumber: bankingDetail?.bankAccountNumber || "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error("User ID is not available");
        setLoading(false); // Stop loading if no user ID
        return;
      }
      try {
        //Fetch signup data
        const response = await axios.get(`api/doctorSignup/${userId}`);
        console.log(response, "signin doctor data");
        // setuserData(response.data);
        dispatch(setDoctorUserData(response.data));

        // Fetch profile data
        const profileResponse = await axios.get(`/api/doctorProfile/${userId}`);
        console.log(profileResponse.data, "Doctor profile data");
        setProfileData(profileResponse.data.doctor);
        setFormDataProfile(profileResponse.data.doctor);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, token, dispatch]);

  React.useEffect(() => {
    if (profileData) {
      setFormDataProfile({
        title: profileData.title,
        speciality: profileData.speciality,
        description: profileData.description,
        charges: profileData.charges,
        country: profileData.country,
        imageUrl: profileData.imageUrl,
        preferredCurrency: profileData.preferredCurrency,
      });
    }
  }, [profileData]);

  const profilehandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormDataProfile({ ...formDataProfile, [name]: value });
  };
  const profilehandleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormDataProfile((prevState) => ({
        ...prevState,
        imageUrl: imageUrl, // Temporarily set for preview
        imageFile: file, // Store the actual file for uploading
      }));
    }
  };


  const profilehandleEditClick = () => {
    setIsEditingProfile(true);
  };

  const handleSaveClick = async () => {
    try {
      const { title, speciality, description, charges, country, preferredCurrency } =
        formDataProfile;
      const payload = { title, speciality, description, charges, country, preferredCurrency };

      const response = await axios.put(
        `/api/doctorProfile/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if required
          },
        }
      );
      console.log(payload, "Updated-Profile-data");
      console.log(response.data, "Updated Profile Data");
      setProfileData(response.data.updatedProfile); // Assuming the API returns the updated profile
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  // For Banking details
  React.useEffect(() => {
    const fetchBankingData = async () => {
      if (!userId) {
        console.error("User ID is not available");
        setLoading(false); // Stop loading if no user ID
        return;
      }
      try {
        const response = await axios.get(
          `api/doctorBankingDetail/user/${userId}`
        );
        console.log(response, "doctor Banking Detail data");
        setBankingDetail(response.data);
        setFormData(response.data);
      } catch ({ error }: any) {
        console.error("Error fetching data:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBankingData();
  }, [userId, token]);

  const handleUpdateBankingDetail = async (
    updatedData: bankingDetailsTypes
  ) => {
    setIsEditing(true);
    try {
      const response = await axios.put(
        `/api/doctorBankingDetail/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token from Redux
          },
        }
      );
      console.log("Banking details updated:", response.data);
    } catch (error) {
      console.error("Error updating banking details:", error);
    }
  };

  const handleEditClick = () => {
    setFormData({
      fullName: bankingDetail?.fullName,
      accountName: bankingDetail?.accountName,
      bankName: bankingDetail?.bankName,
      bankAddress: bankingDetail?.bankAddress,
      bankAccountNumber: bankingDetail?.bankAccountNumber,
      branchCodeIFSC: bankingDetail?.branchCodeIFSC,
      bankAccountNumberIBAN: bankingDetail?.bankAccountNumberIBAN,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const profilehandleSaveClick = async () => {
    try {
      const response = await axios.put(
        `/api/doctorBankingDetail/${bankingDetail?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from Redux
          },
        }
      );
      setIsEditing(false); // Exit edit mode after saving
      setBankingDetail(response.data); // Update UI with saved data
    } catch (error) {
      console.error("Error updating banking details:", error);
    }
  };

  return (
    <>
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={styles.parentGrid}
        justifyContent={"space-between"}
      >
        <Grid
          container
          item
          xl={5}
          lg={5}
          md={5}
          sm={5}
          xs={5}
          className={styles.profileimageGrid}
        >
          {profileData && (
            <>
              <img
                src={profileData.imageUrl}
                alt="Doctor Profile"
                style={{ width: "450px", height: "auto", marginTop: "10px" }}
              />
            </>
          )}
        </Grid>
        <Grid
          container
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={styles.profileinfo}
          mt={1}
          sx={{ marginBottom: "25px", height: "auto" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            userData && (
              <>
                <Grid
                  container
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles.profileName}
                >
                  <Typography className={styles.userName}>
                    Dr.{userData.firstName}
                  </Typography>
                </Grid>

                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mt={5}>
                  <Typography className={styles.contact}>
                    Contact Information
                  </Typography>
                  <Grid container item xl={10} lg={10} md={10} sm={10} xs={10}>
                    <Divider
                      textAlign="left"
                      variant="middle"
                      flexItem
                      sx={{ width: "100%", height: "1px" }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                    mt={2}
                  >
                    <Typography className={styles.email}>Email ID:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.email}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                  >
                    <Typography className={styles.email}>Phone no:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.phone}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mt={2}>
                  <Typography className={styles.contact}>
                    Basic Information
                  </Typography>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    pt={1}
                  >
                    <Divider
                      textAlign="left"
                      variant="middle"
                      flexItem
                      sx={{ width: "100%", height: "1px" }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                    mt={2}
                  >
                    <Typography className={styles.email}>Gender:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.gender}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                    mt={2}
                  >
                    <Typography className={styles.email}>
                      Nationality:
                    </Typography>
                    <Typography className={styles.emailValue}>
                      {userData.nationality}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    justifyContent={"space-between"}
                  >
                    <Typography className={styles.email}>Age:</Typography>
                    <Typography className={styles.emailValue}>
                      {userData.age}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )
          )}

          {/* {loading ? (
            <div>Loading...</div> 
          ):(
            profileData && (
              <div>
          <h2>Doctor Profile</h2>
          <p>Title: {profileData.title}</p>
          <p>Speciality: {profileData.speciality}</p>
          <p>Description: {profileData.description}</p>
          <p>Experience: {profileData.workExperience} years</p>
          <p>Qualification: {profileData.qualification}</p>
          <p>Charges: ${profileData.charges}</p>
          {/* <img src={profileData.imageUrl} alt="Doctor Profile" width="200" /> */}
          {/* </div> */}
          {/* ) */}
          {/* )}  */}

          {isEditingProfile ? (
            <>
              <TextField
                label="Title"
                name="title"
                value={formDataProfile.title}
                onChange={profilehandleInputChange}
                // onChange={(e:any) => setFormDataProfile({...formDataProfile, title: e.target.value})}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Speciality"
                name="speciality"
                value={formDataProfile.speciality}
                onChange={profilehandleInputChange}
                // onChange={(e) => setFormDataProfile({ ...formDataProfile, speciality: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={formDataProfile.description}
                onChange={profilehandleInputChange}
                // onChange={(e) => setFormDataProfile({ ...formDataProfile, description: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Work Experience"
                name="workExperience"
                value={formDataProfile.workExperience}
                onChange={profilehandleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Qualification"
                name="qualification"
                value={formDataProfile.qualification}
                onChange={profilehandleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Charges"
                name="charges"
                value={formDataProfile.charges}
                onChange={profilehandleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Country"
                name="country"
                value={formDataProfile.country}
                onChange={profilehandleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Preferred Country"
                name="preferredCurrency"
                value={formDataProfile.preferredCurrency}
                onChange={profilehandleInputChange}
                fullWidth
                margin="normal"
              />
              <input
                type="file"
                accept="image/*"
                onChange={profilehandleImageChange} // Function to handle the image upload
                style={{ marginTop: "16px" }}
              />
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
            </>
          ) : (
            profileData && (
              <>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Title:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.title}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Speciality:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.speciality}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Description:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.description}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Qualification:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.qualification}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Work Experience:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.workExperience}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Country:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.country}
                  </Typography>
                </Grid>
                
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Charges:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.charges}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  justifyContent={"space-between"}
                >
                  <Typography className={styles.email}>Preffered Currency:</Typography>
                  <Typography className={styles.emailValue}>
                    {profileData.preferredCurrency}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {/* <img
                      src={profileData.imageUrl}
                      alt="Doctor Profile"
                      style={{
                        width: "200px",
                        height: "auto",
                        marginTop: "10px",
                      }}
                    /> */}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={profilehandleEditClick}
                  >
                    Edit
                  </Button> */}
                  <IconLabelButtons
                          name={"Edit"}
                          variant={"contained"}
                          className={styles.IconLabelButtons}
                          endIcon={<EditIcon />}
                          onClick={profilehandleEditClick}
                          />
                </Grid>
              </>
            )
          )}
          {loading ? (
            <div>Loading...</div>
          ) : (
            bankingDetail && (
              <>
                <Grid
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  mt={2}
                  mb={5}
                >
                  <Typography className={styles.contact}>
                    Banking Details
                  </Typography>
                  <Grid
                    container
                    item
                    xl={10}
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    pt={1}
                  >
                    <Divider
                      textAlign="left"
                      variant="middle"
                      flexItem
                      sx={{ width: "100%", height: "1px" }}
                    />
                  </Grid>
                  {isEditing ? (
                    <>
                      <TextField
                        label="Account Holder Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      <TextField
                        label="Account Name"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      {/* Add other TextFields here for editable fields */}

                      <Button variant="contained" onClick={handleSaveClick}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        justifyContent={"space-between"}
                        mt={2}
                      >
                        <Typography className={styles.email}>
                          Account Holder Name:
                        </Typography>
                        <Typography className={styles.emailValue}>
                          {bankingDetail.fullName}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        justifyContent={"space-between"}
                        mt={2}
                      >
                        <Typography className={styles.email}>
                          Bank Name:
                        </Typography>
                        <Typography className={styles.emailValue}>
                          {bankingDetail.bankName}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        justifyContent={"space-between"}
                      >
                        <Typography className={styles.email}>
                          Bank Address:
                        </Typography>
                        <Typography className={styles.emailValue}>
                          {bankingDetail.bankAddress}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        justifyContent={"space-between"}
                      >
                        <Typography className={styles.email}>
                          Bank Account Number:
                        </Typography>
                        <Typography className={styles.emailValue}>
                          {bankingDetail.bankAccountNumber}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        justifyContent={"space-between"}
                      >
                        <Typography className={styles.email}>
                          Branch Code:[IFSC/Routing Code]
                        </Typography>
                        <Typography className={styles.emailValue}>
                          {bankingDetail.branchCodeIFSC}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        justifyContent={"space-between"}
                      >
                        <Typography className={styles.email}>
                          Bank Account Number/IBAN:
                        </Typography>
                        <Typography className={styles.emailValue}>
                          {bankingDetail.bankAccountNumberIBAN}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                      >
                        <IconLabelButtons
                          name={"Edit"}
                          variant={"contained"}
                          className={styles.IconLabelButtons}
                          endIcon={<EditIcon />}
                          onClick={handleEditClick}
                        // onClick={() => editBankingDetail({ accountName: "Updated Account Name" })} // Example of passing new data
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )
          )}
        </Grid>
        <DoctorAvailability />
      </Grid>
    </>
  );
}

export default DoctorProfile;
