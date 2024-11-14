import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import specialityData from './data.json';

type DoctorSpecialitySelectProps = {
  setSelectedSpeciality: (speciality: string | null) => void;
};

const DoctorSpecialitySelect: React.FC<DoctorSpecialitySelectProps> = ({ setSelectedSpeciality }) => {

  const handleSelect = (event: React.SyntheticEvent, speciality: { id: number, speciality: string } | null) => {
    setSelectedSpeciality(speciality ? speciality.speciality : null);
  };

  return (
    <Autocomplete
      id="speciality-select"
      options={specialityData}
      getOptionLabel={(option) => option.speciality}
      onChange={handleSelect}
      sx={{ width: 350 }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
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
          sx={{ background: "white", borderRadius: "4px" }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default DoctorSpecialitySelect;
