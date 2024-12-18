import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import axios from 'axios';

// Props for the component
type DoctorCitySelectProps = {
  setSelectedCity: (city: string | null) => void;
};

// API response type
type DoctorProfile = {
  _id: string;
  userId: {
    _id: string;
    city: string;
  };
};

// Type for unique city list
type CityOption = {
  id: string;
  city: string;
};

const CitySelect: React.FC<DoctorCitySelectProps> = ({ setSelectedCity }) => {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get<{ message: string; doctors: DoctorProfile[] }>(
          '/api/doctorProfile/'
        );
        console.log('API Response:', response);

        // Extract unique cities
        const uniqueCities = Array.from(
          new Set(response.data.doctors.map((profile) => profile.userId?.city).filter(Boolean))
        ).map((city) => ({
          id: city.toLowerCase(), // Lowercased for uniqueness
          city,
        }));

        setCities(uniqueCities);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError('Failed to fetch city data');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleSelect = (event: React.SyntheticEvent, selectedCity: CityOption | null) => {
    setSelectedCity(selectedCity ? selectedCity.city : null);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <Autocomplete
      id="city-select"
      options={cities}
      getOptionLabel={(option) => option.city}
      onChange={handleSelect}
      fullWidth 
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id}
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        >
          {option.city}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="City"
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

export default CitySelect;
