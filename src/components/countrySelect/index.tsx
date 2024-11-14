import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CountrySelect: React.FC<CountrySelectProps> = ({ countries, setSelectedCountry }) => {

  const handleSelect = (event: React.SyntheticEvent, country: CountryType | null) => {
    setSelectedCountry(country ? country.label : null);
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={handleSelect}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 }}}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
        placeholder='Country/Locality'
          sx={{background:"white", borderRadius:"4px", color:"red"}}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}
export default CountrySelect;
interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

interface CountrySelectProps {
  countries: CountryType[];
  setSelectedCountry: (country: string | null) => void;
}
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

