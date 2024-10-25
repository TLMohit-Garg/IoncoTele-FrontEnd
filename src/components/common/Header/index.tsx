import React from "react";
import { Grid } from "@mui/material";
import ioncoLogo from "../../../assets/IoncoSolutionsLogo.png";
import IconLabelButtons from "../../CustomButton/Button";
import stethoscope from "../../../assets/SythethoScope.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import styles from "../../../Styles/header.module.css";
import { Link } from "react-router-dom";
import DoctorPopover from "../../doctorPopover";
import PatientPopover from "../../patientPopover";
import Avatar from "@mui/material/Avatar";
import avatarImage from "../../../assets/doc2.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MenuItem, Menu } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {selectIsDoctorAuthenticated,selectDoctorToken, logout as doctorLogout,
} from "../../../store/authDoctorSlice";
import {
  selectIsPatientAuthenticated,selectPatientToken,
  logout as patientLogout,
} from "../../../store/authPatientSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showpopover, setShowpopover] =
    React.useState<HTMLButtonElement | null>(null);
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menu);
  const [isDoctorSignedIn, setIsDoctorSignedIn] = React.useState(false);
  const [isPatientSignedIn, setIsPatientSignedIn] = React.useState(false);
  // const [doctorAuthenticated, setDoctorAuthenticated] = React.useState(false);
  // const [patientAuthenticated, setPatientAuthenticated] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDoctorSignIn = () => {
    setIsDoctorSignedIn(true); // Update state when doctor signs in
    setIsPatientSignedIn(false);
  };

  const handlePatientSignIn = () => {
    setIsPatientSignedIn(true); // Update state when patient signs in
    setIsDoctorSignedIn(false);
  };
  const menuhandleClose = () => {
    setMenu(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (event: any) => {
    setMenu(event?.currentTarget);
  };

  // Patient popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Doctor popover
  const openPopover = Boolean(showpopover);
  const idLogin = openPopover ? "simple" : undefined;
  const handleloginPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowpopover(e.currentTarget);
  };
  const closePopover = () => {
    setShowpopover(null);
  };

  const isDoctorAuthenticated = useSelector(selectIsDoctorAuthenticated);
  const doctorToken = useSelector(selectDoctorToken);
  const isPatientAuthenticated = useSelector(selectIsPatientAuthenticated);
  const patientToken = useSelector(selectPatientToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Token before logout:", localStorage.getItem("doctortoken"));
    if (isDoctorAuthenticated) {
      localStorage.removeItem("doctortoken"); // Clear the token from localStorage
      localStorage.removeItem("doctoruserId");
      localStorage.removeItem("doctorEmail");
      dispatch(doctorLogout());
      setIsDoctorSignedIn(false); // Reset doctor sign-in state after logout
    } else if (isPatientAuthenticated) {
      localStorage.removeItem("patientToken"); // Clear the token from localStorage
      localStorage.removeItem("patientuserId");
      localStorage.removeItem("patientEmail");
      dispatch(patientLogout());
      setIsPatientSignedIn(false); // Reset doctor sign-in state after logout
    }
    console.log("Token after logout:", localStorage.getItem("patientToken"));
    menuhandleClose();
  };

  const handleProfile = () => {
    if (isDoctorSignedIn || isPatientSignedIn) {
      navigate("/profile");
    }
  };
  const bankingDetails = () => {
    navigate("/doctorBankingDetails");
  };
  const appointments = () => {
    navigate("/myAppointments");
  };
  const base64UrlDecode = (str: string) => {
    // Replace characters to make it Base64 compatible
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    // Decode base64 string
    const decodedData = atob(base64);
    return JSON.parse(decodeURIComponent(escape(decodedData)));
  };
  const checkTokenValidity = (token: string) => {
    try {
      // Split the JWT token (header, payload, signature)
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        return false; // Invalid token structure
      }

      const payload = tokenParts[1]; // The payload is the second part of the token
      const decodedPayload = base64UrlDecode(payload); // Decode the payload

      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedPayload.exp > currentTime; // Return true if token is not expired
    } catch (error) {
      return false; // Invalid or expired token
    }
  };

  React.useEffect(() => {
    // Check if doctor token exists in localStorage and is valid
    const doctorToken = localStorage.getItem("doctortoken");
    if (doctorToken) {
      // alert("Doctor Token exists in local storage!");
      const isValid = checkTokenValidity(doctorToken);
      setIsDoctorSignedIn(isValid); // Update the state based on token validity
    }
    if (isDoctorAuthenticated) {
      setIsDoctorSignedIn(true);
      console.log('Doctor is authenticated');
    }
   
  }, [isDoctorAuthenticated, doctorToken]);

  React.useEffect(()=> {
     // Check if patient token exists in localStorage and is valid
     const patientToken = localStorage.getItem("patientToken");
     if (patientToken) {
      // alert("Patient Token exists in local storage!");
       const isValid = checkTokenValidity(patientToken);
       setIsPatientSignedIn(isValid);
     }
     if (isPatientAuthenticated) {
       setIsPatientSignedIn(true);
     }
  },[isPatientAuthenticated, patientToken])
  return (
    <>
      <Grid
        container
        spacing={3}
        className={styles.parentGrid}
        item
        justifyContent={"space-between"}
      >
        <Grid container item xs={4} md={4} sm={4} lg={4} xl={4}>
          <Grid
            item
            container
            xs={12}
            md={6}
            sm={12}
            lg={4}
            xl={4}
            justifyContent="center"
            alignItems="center"
            className={styles.imageStack}
          >
            <Link to="/home">
              <img src={ioncoLogo} alt="logo" className={styles.logo} />
            </Link>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={6}
            sm={12}
            lg={8}
            xl={8}
            justifyContent="left"
            alignItems="center"
            className={styles.logoText}
          >
            {/* <Typography className={styles.logoTextspan} >IONCO<span style={{color:"#10A0BD"}}>TELI</span>CONSULTATION</Typography> */}
            IONCO<span className={styles.innerlogoText}>TELE</span>CONSULTATION
          </Grid>
        </Grid>
        <Grid container item xs={4} md={4} sm={4} lg={5} xl={5}>
          <Grid
            item
            container
            xs={12}
            md={6}
            sm={12}
            lg={7}
            xl={7}
            justifyContent="flex-end"
            alignItems="center"
          >
            {!isPatientSignedIn && (
              <IconLabelButtons
                onClick={handleloginPopover}
                name="I'm a Doctor"
                className={styles.IconLabelButtons}
                icon={
                  <img
                    src={stethoscope}
                    alt="stethoscope"
                    className={styles.stethoscope}
                  />
                }
                endIcon={<ArrowDropDownIcon />}
                variant="outlined"
                aria-describedby={idLogin}
              />
            )} 
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            sm={12}
            lg={5}
            xl={5}
            justifyContent="flex-end"
            alignItems="center"
          >
            {!isDoctorSignedIn && (
              <IconLabelButtons
                onClick={handleClick}
                name="I'm a Patient"
                className={styles.IconLabelButtons}
                icon={<PersonIcon style={{ fontSize: 30, color: "#10A0BD" }} />}
                variant="outlined"
                endIcon={<ArrowDropDownIcon />}
                aria-describedby={id}
              />
             )} 
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={4}
          md={4}
          sm={4}
          lg={3}
          xl={3}
          className={styles.headerPhoneSection}
          justifyContent={"right"}
        >
          <Grid
            container
            item
            xs={12}
            md={12}
            sm={12}
            lg={6}
            xl={6}
            justifyContent="flex-end"
            alignItems="center"
            className={styles.PhoneSectionheader}
          >
            {/* <Link to="/admin"> */}
            <Link to="/adminSignIn">
              <IconLabelButtons
                name="Admin Panel"
                className={styles.adminButton}
                variant="outlined"
                borderRadius="14px"
              />
            </Link>
          </Grid>
          {/* create an account */}
          {isDoctorAuthenticated || isPatientAuthenticated ? (
            <Grid
              container
              item
              xs={12}
              md={12}
              sm={12}
              lg={6}
              xl={6}
              justifyContent="center"
              alignItems="center"
              className={styles.phoneTextSection}
            >
              <Avatar
                alt="avatar"
                src={avatarImage}
                className={styles.avatarImage}
              />
              <KeyboardArrowDownIcon
                className={styles.KeyboardArrowDownIcon}
                onClick={handleMenuClick}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            </Grid>
          ) : (
            <Grid
              container
              item
              xs={12}
              md={12}
              sm={12}
              lg={6}
              xl={6}
              justifyContent="center"
              alignItems="center"
              className={styles.phoneTextSection}
            >
              
            </Grid>
          )}
        </Grid>
        <Divider className={styles.divider} />
      </Grid>

      {/* Popover  */}
      <PatientPopover
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        onSignIn={handlePatientSignIn}
      />
      <DoctorPopover
        open={openPopover}
        anchorEl={showpopover}
        handleClose={closePopover}
        onSignIn={handleDoctorSignIn}
      />

      {/* Profile Menu  */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={menuhandleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          top: "70px",
          right: "75px",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonAddAltOutlinedIcon />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem onClick={appointments}>
          <ListItemIcon>
            <CalendarMonthOutlinedIcon />
          </ListItemIcon>
          My appointments
        </MenuItem>
        <MenuItem onClick={bankingDetails}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          Banking details
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        {(isDoctorSignedIn || isPatientSignedIn) && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default Header;
