import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import styles from "../../Styles/cards.module.css";
// import DoctorDetailsModal from "../doctorDetailModal";
// import { DialogProps } from "@mui/material";

type CustomCardProps = {
  id?: string;
  image?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  secondButtonText?: string;
  onButtonClick?: () => void;
  speciality?: string;
  hourlyCharges?: string;
  preferredCurrency?: string;
  handleViewProfile?: () => void;
};

export default function CustomCard({
  id,
  image,
  title,
  description,
  buttonText,
  secondButtonText,
  onButtonClick,
  speciality,
  hourlyCharges,
  preferredCurrency,
  handleViewProfile,
}: CustomCardProps) {
  // const [modalOpen, setmodalOpen] = React.useState(false);
  // const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  // const handelClose = () => {
  //   setmodalOpen(false);
  // };

  // const handleClickOpen = (scrollType: any) => {
  //   setmodalOpen(true);
  //   setScroll(scrollType);
  // };

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        className={styles.root}
        // onClick={handleClickOpen}
        // onClick={onButtonClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="331"
            image={image}
            // alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span style={{marginRight:"5px"}}>Dr.</span>{title}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom:"12px",
              }}
            >
              <span style={{ fontSize:"16px"}}>{speciality}</span>
              <span>
                Charges
                <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                  {hourlyCharges}
                </span>
                <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                  {preferredCurrency}
                </span>
              </span>
            </div>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={onButtonClick}>
            {buttonText}
          </Button>
          <Button size="small" color="primary" onClick={handleViewProfile}>
            {secondButtonText}
          </Button>
        </CardActions>
      </Card>

      {/* {modalOpen && (
        <DoctorDetailsModal
          open={modalOpen}
          onClose={handelClose}
          scroll={scroll}
        />
      )} */}
    </>
  );
}
