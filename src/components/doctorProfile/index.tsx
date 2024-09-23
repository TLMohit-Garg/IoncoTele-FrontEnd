import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import patientImage from "../../assets/doc8.png";
import Divider from "@mui/material/Divider";
import styles from "/src/Styles/patientProfile.module.css";
import axios from "axios";
import { patientProfileTypes } from "../../customDataTypes/datatypes";
import {bankingDetailsTypes} from "../../customDataTypes/datatypes";
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from '../../store/userSlice';
import { RootState } from '../../store/store';
import IconLabelButtons from "../CustomButton/Button";
import EditIcon from '@mui/icons-material/Edit';
import { Toast } from "../ToastMessage";
 
function DoctorProfile() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);
  const token = useSelector((state: RootState) => state.authDoctor.token);
  const [userData, setuserData] = React.useState<patientProfileTypes>();
  const [bankingDetail, setBankingDetail] = React.useState<bankingDetailsTypes>();
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
        const response = await axios.get(
          `api/doctorSignin/${userId}`
        );
        console.log(response, "signin patient data");
        setuserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  React.useEffect(() => {
    const fetchBankingData  = async () => {
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
      } catch ({error}:any) {
        console.error("Error fetching data:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBankingData();
  }, [userId, token]);

  const handleUpdateBankingDetail = async(updatedData: bankingDetailsTypes) => {
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
      console.log('Banking details updated:', response.data);
    } catch (error) {
      console.error('Error updating banking details:', error);
      
    }
  }

  const handleEditClick = () => {
    setFormData({
      fullName: bankingDetail?.fullName,
      accountName: bankingDetail?.accountName,
      bankName: bankingDetail?.bankName,
      bankAddress: bankingDetail?.bankAddress,
      bankAccountNumber: bankingDetail?.bankAccountNumber,
      branchCodeIFSC: bankingDetail?.branchCodeIFSC,
      bankAccountNumberIBAN: bankingDetail?.bankAccountNumberIBAN,
      speciality: bankingDetail?.speciality,
      description: bankingDetail?.description,
      experience: bankingDetail?.experience,
      consultationCharges: bankingDetail?.consultationCharges,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `/api/doctorBankingDetail/${bankingDetail?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Use token from Redux
          },
        }
      );
      setIsEditing(false);  // Exit edit mode after saving
      setBankingDetail(response.data);  // Update UI with saved data
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
            This is Doctor Profile
          <img
            src={patientImage}
            alt="patientimage"
            className={styles.profileimage}
          />
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
         sx={{marginBottom:"25px", height:"auto"}}
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

{loading ? (
            <div>Loading...</div> 
          ) : (
            bankingDetail && (
              <>
                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mt={2} mb={5}>
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
                    <Typography className={styles.email}>Account Holder Name:</Typography>
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
                    <Typography className={styles.email}>Bank Address:</Typography>
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
                    <Typography className={styles.email}>Bank Account Number:</Typography>
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
                    <Typography className={styles.email}>Branch Code:[IFSC/Routing Code]</Typography>
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
                    <Typography className={styles.email}>Bank Account Number/IBAN:</Typography>
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
      </Grid>
    </>
  );
}

export default DoctorProfile;
