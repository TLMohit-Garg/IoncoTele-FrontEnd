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
import {
  selectIsDoctorAuthenticated, selectDoctorToken, selectDoctorUserId
} from "../../store/authDoctorSlice";
import {
  selectIsPatientAuthenticated, selectPatientToken, selectPatientUserId
} from "../../store/authPatientSlice";

interface AppointmentData {
  consultationTime: string;
  patientId: { _id: string; firstName: string };
  doctorId: { _id: string; firstName: string };
  videoCallLink?: string;
}

export default function UserCard() {
  const [appointmentData, setAppointmentData] =
    React.useState<AppointmentData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [videoCallLink, setVideoCallLink] = React.useState("");
  const [appointments, setAppointments] = React.useState([]);

  const isDoctorAuthenticated = useSelector(selectIsDoctorAuthenticated);
  const doctorToken = useSelector(selectDoctorToken);
  const doctorId = useSelector(selectDoctorUserId);
  const isPatientAuthenticated = useSelector(selectIsPatientAuthenticated);
  const patientToken = useSelector(selectPatientToken);
  const patientId = useSelector(selectPatientUserId);

  const doctorName = appointmentData?.doctorId?.firstName || "Doctor name";
  const patientName = appointmentData?.patientId?.firstName || "Patient name";

  const displayedName = isDoctorAuthenticated ? patientName : isPatientAuthenticated ? doctorName : "Doctor/Patient";
  const handleJoinCall = () => {
    if (videoCallLink) {
      // window.location.href = videoCallLink;
      window.open(videoCallLink, "_blank");
    } else {
      console.error("No video link available");
      alert("No video link available");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        // Determine whether fetching appointments or video call details
        const userId = isDoctorAuthenticated ? doctorId : patientId;
  
        if (userId) {
          // Fetch video call link and details
          const videoCallResponse = await axios.get(
            `/api/videoCallDetail/${userId}`
          );
  
          if (videoCallResponse.data && videoCallResponse.data.length > 0) {
            const consultation = videoCallResponse.data[0]; // First consultation
            setVideoCallLink(consultation.videoCallLink);
            setAppointmentData(consultation);
          }
  
          // Fetch appointments
          const endpoint = isDoctorAuthenticated
            ? `/api/bookingConsultation/getdoctorId/${userId}`
            : `/api/bookingConsultation/getpatientId/${userId}`;
  
          const appointmentResponse = await axios.get(endpoint);
          setAppointments(appointmentResponse.data);
        }
      } catch (err) {
        console.error(err, "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    // Only trigger if doctorId or patientId exists
    if (doctorId || patientId) {
      fetchData();
    }
  }, [doctorId, patientId, isDoctorAuthenticated, isPatientAuthenticated]);
  
  // Handle loading and error states
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
      {appointments.length > 0 ? (
        appointments.map((appointment: any) => {
          const isDoctor = !!isDoctorAuthenticated;
          const displayedName = isDoctor ? appointment.fullName : appointment.doctorId?._id || "N/A";
          const profileImage = isDoctor
            ? appointment.images?.[0] || "https://via.placeholder.com/150"
            : "https://via.placeholder.com/150";

          return (
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
                  src={profileImage}
                  // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </AspectRatio>
              <CardContent>
                <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
                  {/* {appointmentData?.doctorId?.firstName || "Doctor"} */}
                  {displayedName}
                </Typography>
                <Typography
                  level="body-sm"
                  textColor="text.tertiary"
                  sx={{ fontWeight: "lg" }}
                >
                  {/* Cancer Specialist */}
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
                    {appointment ? (
                      <Typography sx={{ fontWeight: "lg" }}>
                        {appointment?.prefferDate || "N/A"}
                        {/* {new Date(appointmentData.consultationTime).toLocaleString()} */}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: "lg" }}>
                        not found
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
                    {/* <Typography sx={{ fontWeight: "lg" }}>$200</Typography> */}
                  </div>
                  <div>
                    {/* <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                      Cancer Type
                    </Typography>
                    <Typography sx={{ fontWeight: "lg" }}>Mouth Cancer</Typography> */}
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
                    <VolumeUpIcon sx={{ cursor: "pointer", color: "#10a0bd" }} />
                  </div>
                </Sheet>

                <Sheet
                  sx={{
                    bgcolor: "background.level1",
                    borderRadius: "sm",
                    p: 1.5,
                    my: 1.5,
                  }}
                >
                  <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                    Uploaded Documents
                  </Typography>
                  {appointment.images && appointment.images.length > 0 ? (
                    appointment.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Document ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                          cursor:"pointer",
                        }}
                      />
                    ))
                  ) : (
                    <Typography>No documents uploaded</Typography>
                  )}
                </Sheet>
                <Box
                  sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
                  className={styles.Button}
                >
                  <Button
                    variant="outlined"
                    color="neutral"
                    className={styles.cancelBtn}
                  >
                    Cancel Appointment
                  </Button>
                  <Button
                    variant="solid"
                    className={styles.meetingButton}
                    onClick={handleJoinCall}
                    disabled={!videoCallLink}
                  >
                    <VideoCallIcon sx={{ marginRight: "12px" }} />
                    {videoCallLink
                      ? "Join Meeting"
                      : "Waiting for Link"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p>No appointments found</p>
      )}
    </Box>
  );
}
