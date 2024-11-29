import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import doctors from "../../pages/doctors/data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {DoctorType} from "../../customDataTypes/datatypes";


interface SearchDoctorProps {
  // doctors: DoctorType[];
  setSelectedSpeciality: (speciality: string | null) => void;
}

const SearchDoctor: React.FC<SearchDoctorProps> = ({
  setSelectedSpeciality,
}) => {
  const[doctors, setDoctors] = React.useState<DoctorType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch doctors from API
  React.useEffect(() => {
    const fetchDoctors =async () => {
      try {
       setLoading(true);
       const response = await axios.get("/api/doctorProfile");
       setDoctors(response.data.doctors);
       console.log("Doctors data from api",response.data.doctors);
      } catch (error) {
        setError("Failed to load doctors.");
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchDoctors();
  },[])

  const handleSelect = (
    event: React.SyntheticEvent,
    doctor: DoctorType | null
  ) => {
    if (doctor) {
      setSelectedSpeciality(doctor.speciality);
      console.log("Selected doctor object:", doctor.speciality); // Logs the entire selected object
      if (doctor) {
        console.log("Doctor ID:", doctor.userId?._id);
        navigate(`/doctor/${doctor.userId?._id}`);
      } else {
        console.error("Doctor ID is missing in selected object:", doctor);
      }
    } else {
      console.log("No doctor selected.");
    }
  };

  if (loading) {
    return <Box sx={{ textAlign: "center", padding: 2 }}>Loading...</Box>;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 2, color: "red" }}>
        {error}
      </Box>
    );
  }
  return (
    <Autocomplete
      id="doctor-select-demo"
      sx={{ width: 550 }}
      options={doctors as DoctorType[]}
      autoHighlight
      getOptionLabel={(option: DoctorType) =>
        `${option.title} - ${option.speciality}
        (${option.userId.firstName} ${option.userId.lastName})
        `
      }
      onChange={handleSelect}
      // filterOptions={(options, state) => {
      //   // Custom filter to search both by name and speciality
      //   const query = state.inputValue.toLowerCase();
      //   return options.filter(
      //     (option) =>
      //       option.title.toLowerCase().includes(query) ||
      //       option.speciality.toLowerCase().includes(query)
      //   );
      // }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="40"
              height="40"
              src={option.imageUrl}
              alt={option.title}
              style={{ borderRadius: "50%" }}
            />
            <Box sx={{ ml: 2 }}>
              <strong>{option.title}</strong> - {option.speciality}
              <br />
              <small>{option.workExperience} experience</small>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Doctor"
          sx={{ background: "white", borderRadius: "4px" }}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
};
export default SearchDoctor;
