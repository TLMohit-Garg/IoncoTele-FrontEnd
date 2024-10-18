import React, { useState } from "react";
// import EnhancedTable from "../../components/customTable";
import { Button, Grid } from "@mui/material";
// import BasicTable from "../../components/customTablePatient";
import axios from "axios";
// import DataTable from "../../components/testingTabel";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../Styles/admin.module.css";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import Groups2Icon from "@mui/icons-material/Groups2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
// import ReactDataTable from "../../components/reactdatatableComponent";
import Muidatatable from "../../components/muidataTable";
import DoctoctorMuidatatable from "../../components/doctorMuidataTable";
import GenerateVideoCallLink from "../../components/generateVideoCallLink";

export default function Admin() {
  const [activeContent, setActiveContent] = useState<JSX.Element | null>(null);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const routes = [
    {
      label: (
        <>
          <PersonIcon sx={{ margin: "5px" }} />
          Registered Doctors
        </>
      ),
      content: <DoctoctorMuidatatable />,
    },
    {
      label: (
        <>
          <PeopleIcon sx={{ margin: "5px", paddingRight: "3px" }} />
          List of Doctors
        </>
      ),
      content: <DoctoctorMuidatatable />,
    },
    {
      label: (
        <>
          <Groups2Icon sx={{ margin: "5px", paddingRight: "3px" }} />
          Team of Doctors
        </>
      ),
      content: <DoctoctorMuidatatable />,
    },
    {
      label: (
        <>
          <Diversity3Icon sx={{ margin: "5px", paddingRight: "3px" }} />
          List of Patients
        </>
      ),
      content: <Muidatatable />,
    },
    {
      label:(
        <>
      GenerateVideoCallLink
        </>
      ),
      content: <GenerateVideoCallLink/>
    },
    {
      label: (
        <Accordion
          expanded={expanded === "consultations"}
          onChange={handleAccordionChange("consultations")}
          className={styles.accordioParent}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="consultations-content"
            id="consultations-header"
          >
            <Typography className={styles.consultationText}>
              Consultations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              onClick={() =>
                setActiveContent(<h2>New Consultation Content</h2>)
              }
              variant="text"
              className={styles.accordioText}
            >
              New Consultation
            </Button>
            <Button
              onClick={() =>
                setActiveContent(<h2>Completed Consultation Content</h2>)
              }
              variant="text"
              className={styles.accordioText}
            >
              Completed Consultation
            </Button>
            <Button
              onClick={() =>
                setActiveContent(<h2>Rejected Consultation Content</h2>)
              }
              variant="text"
              className={styles.accordioText}
            >
              Rejected Consultation
            </Button>
          </AccordionDetails>
        </Accordion>
      ),
      content: null,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = React.useState<any>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/patientSignin");
        console.log(response, "signup doctors data");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid
        container
        item
        xs={12}
        md={12}
        sm={12}
        lg={12}
        xl={12}
        justifyContent={"space-between"}
        className={styles.parentGrid}
      >
        <Grid
          item
          xs={2}
          md={2}
          sm={2}
          lg={2}
          xl={2}
          className={styles.leftGrid}
        >
          {routes.map((route, index) => (
            <Grid
              key={index}
              item
              container
              xs={12}
              md={12}
              sm={12}
              lg={12}
              xl={12}
              className={styles.sidebarMenu}
              onClick={() => setActiveContent(route.content)}
              // onClick={() => {
              //   if (route.label === 'Consultations') {
              //     setActiveContent(route.content);
              //   } else {
              //     setActiveContent(route.content);
              //     setExpanded(false);
              //   }
              // }}
            >
              {route.label}
            </Grid>
          ))}
        </Grid>

        <Grid
          item
          xs={10}
          md={10}
          sm={10}
          lg={10}
          xl={10}
          className={styles.tableLayout}
        >
          {activeContent}
        </Grid>
      </Grid>
    </>
  );
}
