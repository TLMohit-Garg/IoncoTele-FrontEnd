import React from "react";
import { Grid } from "@mui/material";
import ioncoLogo from "../../../assets/IoncoSolutionsLogo.png";
import IconLabelButtons from "../../CustomButton/Button";
import stethoscope from "../../../assets/SythethoScope.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import styles from "../../../Styles/header.module.css";
import { Link } from "react-router-dom";
import DoctorPopover from "../../doctorPopover";
import PatientPopover from "../../patientPopover";
import Avatar from "@mui/material/Avatar";
import avatarImage from "../../../assets/doc2.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem, Menu } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../../../store/authSlice';
import { logout } from "../../../store/authSlice";

function Header() {
  // const [token] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showpopover, setShowpopover] =
    React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menu);

  const menuhandleClose = () => {
    setMenu(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (event:any) => {
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

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
  console.log("Token before logout:", localStorage.getItem('token'));
  dispatch(logout());
  localStorage.removeItem('token');  // Clear the token from localStorage
  console.log("Token after logout:", localStorage.getItem('token')); 
  menuhandleClose();
};
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
            <IconLabelButtons
              onClick={handleClick}
              name="I'm a Patient"
              className={styles.IconLabelButtons}
              icon={<PersonIcon style={{ fontSize: 30, color: "#10A0BD" }} />}
              variant="outlined"
              endIcon={<ArrowDropDownIcon />}
              aria-describedby={id}
            />
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
            <Link to="/admin">
              <IconLabelButtons
                name="Admin Panel"
                className={styles.adminButton}
                variant="outlined"
                borderRadius="14px"
              />
            </Link>
          </Grid>
          {/* create an account */}
          {isAuthenticated ? (
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
            ></Grid>
          )}
        </Grid>
        <Divider className={styles.divider} />
      </Grid>

      {/* Popover  */}
      <PatientPopover
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
      <DoctorPopover
        open={openPopover}
        anchorEl={showpopover}
        handleClose={closePopover}
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
        <MenuItem>My Profile</MenuItem>
        <MenuItem>My appointments</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default Header;
