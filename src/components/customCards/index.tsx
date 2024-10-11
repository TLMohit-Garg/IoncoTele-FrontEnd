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
  image?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: any;
  speciality?: string;
  hourlyCharges?: string;
};

export default function CustomCard({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
  speciality,
  hourlyCharges,
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
        onClick={onButtonClick}
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
              {title}
            </Typography>
            <Typography gutterBottom >{speciality}{hourlyCharges}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={onButtonClick}>
            {buttonText}
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
