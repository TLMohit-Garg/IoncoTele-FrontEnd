import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import axios from 'axios';

type DoctorSpecialitySelectProps = {
  setSelectedSpeciality: (speciality: string | null) => void;
};

type DoctorProfile = {
  _id: string;
  speciality: string;
};

const DoctorSpecialitySelect: React.FC<DoctorSpecialitySelectProps> = ({ setSelectedSpeciality }) => {
  const [specialities, setSpecialities] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.get<{
          message: string;
          doctors: DoctorProfile[];
        }>('/api/doctorProfile/');
        console.log("resposne speciliaty:", response);

        const doctors = response.data.doctors;
        // Extract unique specialities
        const uniqueSpecialities = Array.from(
          new Set(doctors.map((profile: DoctorProfile) => profile.speciality))
        ).map((speciality) => ({ _id: speciality, speciality }));
        console.log("uniqueSpecialities:--", uniqueSpecialities);
        setSpecialities(uniqueSpecialities);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchSpecialities();
  }, []);

  const handleSelect = (
    event: React.SyntheticEvent,
    speciality: DoctorProfile | null
  ) => {
    setSelectedSpeciality(speciality ? speciality.speciality : null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Autocomplete
      id="speciality-select"
      options={specialities}
      getOptionLabel={(option: DoctorProfile) => option.speciality}
      onChange={handleSelect}
      fullWidth 
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={option._id}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.speciality}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Speciality"
          sx={{ background: 'white', borderRadius: '4px' }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default DoctorSpecialitySelect;
