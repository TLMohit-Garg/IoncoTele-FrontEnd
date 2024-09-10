import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CheckBoxprops } from '../../customDataTypes/datatypes';

export default function CustomCheckBox({checked,handleChange}:CheckBoxprops) {

  return (
    <Checkbox
      checked={checked} // pass as state
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
