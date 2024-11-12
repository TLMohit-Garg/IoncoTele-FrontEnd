import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CheckBoxprops } from '../../customDataTypes/datatypes';

export default function CustomCheckBox({checked, handleChange, onClick}:CheckBoxprops) {

  return (
    <Checkbox
      checked={checked} // pass as state
      onChange={handleChange}
      onClick={onClick}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
