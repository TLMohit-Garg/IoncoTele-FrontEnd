import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import docImage from "../../assets/doc3.png";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "/src/Styles/appointmentsCard.module.css";

interface AppointmentData {
  prefferDate: string;
}

export default function UserCard() {
  const [appointmentData, setAppointmentData] =
    React.useState<AppointmentData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // const token = useSelector((state:RootState) => state.auth.token); // Fetch JWT from Redux
        const response = await axios.get<AppointmentData>(
          "http://localhost:3000/api/bookingConsultation/67062ce15fd586f36dc7e277"
        );
        setAppointmentData(response.data); // Store appointment details in state
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "block",
          width: "1px",
          bgcolor: "white",
          left: "500px",
          top: "-24px",
          bottom: "-24px",
          "&::before": {
            top: "4px",
            // content: '"vertical"',
            display: "block",
            position: "absolute",
            right: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
          "&::after": {
            top: "4px",
            // content: '"horizontal"',
            display: "block",
            position: "absolute",
            left: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <AspectRatio
          flex
          ratio="1"
          sx={{ height: 252, maxHeight: 252, minWidth: 182 }}
        >
          <img
            src={docImage}
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </AspectRatio>
        <CardContent>
          <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
            Dr. Govinda Morrison
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: "lg" }}
          >
            Cancer Specialist
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Appointment Date & Time
              </Typography>
              {appointmentData ? (
                <Typography sx={{ fontWeight: "lg" }}>
                  {appointmentData.prefferDate}
                </Typography>
              ) : (
                <Typography sx={{ fontWeight: "lg" }}>
                  12/10/24 12:30 P.M
                </Typography>
              )}
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Consultation Duration
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>45 minutes</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Status of the Appointment
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>Upcoming</Typography>
            </div>
          </Sheet>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Payment Status
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>Paid</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Consultation Fees
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>$200</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Cancer Type
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>Mouth Cancer</Typography>
            </div>
          </Sheet>

          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              // '& > div': { flex: 1 },
            }}
          >
            <div style={{ flex: 6 }}>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Appointment Notes
              </Typography>
              <Typography sx={{ fontWeight: "md" }}>
                Doc will provide from his end, Doc will provide from his end,
                Doc will provide from his end, Doc will provide from his end,
                Doc will provide from his end, Doc will provide from his end.
                Doc will provide from his end, Doc will provide from his end.
              </Typography>
            </div>
            <div style={{ flex: 3 }}>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Audio file Notes
              </Typography>
              <VolumeUpIcon sx={{cursor:"pointer", color:"#10a0bd"}}/>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }} className={styles.Button}>
            <Button variant="outlined" color="neutral" className={styles.cancelBtn}>
              Cancel Appointment
            </Button>
            <Button variant="solid"  className={styles.meetingButton}>
              <VideoCallIcon sx={{ marginRight: "12px" }} />
              Join Meeting
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
