import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import { Grid } from "@mui/material";

const InputField = ({
  label,
  variant,
  fullWidth,
  handleForgotPassword,
  startAdornment,
  endAdornment,
  value,
  onChange,
  className,
  ...InputFieldProps
}: any) => {
  return (
    <Grid container>
      <TextField
        label={label}
        variant={variant}
        fullWidth={true}
        value={value}
        onChange={onChange}
        className={className}
        InputProps={{
          startAdornment: (
            <>
              {startAdornment && (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )}
            </>
          ),
          endAdornment: (
            <>
              {endAdornment && (
                <InputAdornment position="end">
                  <button onClick={handleForgotPassword}>
                    Forgot password?
                  </button>
                </InputAdornment>
              )}
            </>
          ),
        }}
        {...InputFieldProps}
      />
    </Grid>
  );
};

export default InputField;