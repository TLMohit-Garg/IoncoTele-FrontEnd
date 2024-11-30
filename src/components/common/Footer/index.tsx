import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import ioncoLogo from "../../../assets/IoncoSolutionsLogo.png";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import docConsul from "../../../assets/docsconsul2.jpg";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const [color, setColor] = React.useState<ColorPaletteProp>("primary");
  const doctorPage = () => {
    navigate("/doctors");
  };
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "neutral" && {
          bgcolor: `${color}.800`,
        }),
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: "sm" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "22px",
        }}
      >
        <Grid
          container
          item
          justifyContent={"space-between"}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <Grid item container xl={1} lg={1} sm={1} justifyContent={"center"}>
            <Link to="/home">
              <img
                alt=""
                src={ioncoLogo}
                style={{ width: "60px", height: "60px" }}
              />
            </Link>
          </Grid>
          <Grid item container xl={4} lg={4} sm={4}>
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
              <Typography
                level="body-lg"
                sx={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "semiBold",
                }}
              >
                IONCO TELE CONSULTATION
              </Typography>
            </Grid>
            <Grid item xl={8} lg={8} sm={8} md={12} xs={12}>
              <Typography
                level="body-sm"
                sx={{ color: "#FCFEFE", fontFamily: "Inter, sans-serif" }}
              >
                Leading the Way in Teleconsultation Excellence in Virtual
                Healthcare, Trusted Care, and Commitment to the Well-being of
                Patients and Medical Professionals. Revolutionizing Access to
                Quality Healthcare Anytime, Anywhere.
              </Typography>
            </Grid>
          </Grid>
          <Grid container xl={7} lg={7} sm={7} justifyContent={"flex-end"}>
            <List
              size="sm"
              orientation="horizontal"
              wrap
              sx={{ flexGrow: 1, "--ListItem-radius": "8px" }}
            >
              <ListItem nested sx={{ width: { xs: "50%", md: 150 } }}>
                <ListSubheader sx={{ fontWeight: "xl" }}>
                  Important Link
                </ListSubheader>
                <List>
                  <ListItem>
                    <a
                      href="https://ioncosolutions.com/about-us"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ListItemButton>About Us</ListItemButton>
                    </a>
                  </ListItem>
                  <ListItem>
                    <Link to="/doctors">
                      <ListItemButton>All Doctors</ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/term&Condition">
                      <ListItemButton>Term's & Condition</ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/privacyPolicy">
                      <ListItemButton>Privacy Policy</ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/refundPolicy">
                      <ListItemButton>Refund Policy</ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </ListItem>
              <ListItem nested sx={{ width: { xs: "50%", md: 230 } }}>
                <ListSubheader sx={{ fontWeight: "xl" }}>
                  Contact Us
                </ListSubheader>
                <List>
                  <ListItem>
                    <ListItemButton>
                      Call: +44 7869695833  
                       +44 7850767260
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      Support: ioncosolutions@gmail.com   info@ioncosolutions.com
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    {/* <ListItemButton>
                      Support: webcodeft@gmail.com
                    </ListItemButton> */}
                  </ListItem>
                  <ListItem>
                    {/* <ListItemButton>Address: 0123 street, place UK</ListItemButton> */}
                  </ListItem>
                </List>
              </ListItem>
              <ListItem nested sx={{ width: { xs: "50%", md: 200 } }}>
                <ListSubheader sx={{ fontWeight: "xl" }}>
                  Book Consultation now
                </ListSubheader>
                <List>
                  <Card
                    variant="soft"
                    size="sm"
                    sx={{
                      flexDirection: { xs: "row", md: "column" },
                      minWidth: { xs: "100%", md: "auto" },
                      gap: 1,
                    }}
                  >
                    <AspectRatio
                      ratio="21/9"
                      minHeight={100}
                      sx={{ flexBasis: { xs: 200, md: "initial" } }}
                    >
                      <img
                        src={docConsul}
                        onClick={doctorPage}
                        style={{ height: "100px", cursor: "pointer" }}
                      />
                    </AspectRatio>
                    <CardContent>
                      <Typography level="body-sm">Call us today</Typography>
                      <Typography level="body-xs">+44 7869695833</Typography>
                    </CardContent>
                  </Card>
                </List>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          paddingLeft: "32px",
        }}
      >
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors: ColorPaletteProp[] = ["primary"];
            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <InstagramIcon />
        </IconButton>
      </Box>
      <Grid
        sx={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <p>© 2024-25, IOncology Solutions. All Rights Reserved.</p>
      </Grid>
      <Divider sx={{ my: 2 }} />
    </Sheet>
  );
}
