import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import axios from 'axios';

// Props for the component
type DoctorNationalitySelectProps = {
  setSelectedNationality: (nationality: string | null) => void;
};

// API response type
type DoctorProfile = {
  _id: string;
  userId: {
    _id: string;
    nationality: string;
  };
};

// Type for unique nationality list
type NationalityOption = {
  id: string;
  nationality: string;
};

const CountrySelect: React.FC<DoctorNationalitySelectProps> = ({ setSelectedNationality }) => {
  const [nationalities, setNationalities] = useState<NationalityOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get<{ message: string; doctors: DoctorProfile[] }>(
          '/api/doctorProfile/'
        );
        console.log('API Response:', response);

        // Extract unique nationalities
        const uniqueNationalities = Array.from(
          new Set(
            response.data.doctors.map((profile, index) => profile.userId?.nationality).filter(Boolean)
          )
        ).map((nationality, index) => ({
          id: `${nationality.toLowerCase()}-${index}`, // Lowercased for uniqueness
          nationality,
        }));

        setNationalities(uniqueNationalities);
      } catch (err) {
        console.error('Error fetching nationalities:', err);
        setError('Failed to fetch nationality data');
      } finally {
        setLoading(false);
      }
    };

    fetchNationalities();
  }, []);

  const handleSelect = (event: React.SyntheticEvent, selectedNationality: NationalityOption | null) => {
    setSelectedNationality(selectedNationality ? selectedNationality.nationality : null);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <Autocomplete
      id="nationality-select"
      options={nationalities}
      getOptionLabel={(option) => option.nationality}
      onChange={handleSelect}
      fullWidth 
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id}
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        >
          {option.nationality}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Country/Locality"
          sx={{ background: 'white', borderRadius: '4px' }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // Disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
