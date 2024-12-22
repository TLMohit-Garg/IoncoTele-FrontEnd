import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Grid } from "@mui/material";

export default function CustomTextField({
  error,
  errorCondition,
  onSubmit,
  control,
  name,
  form,
  fullWidth,
  className,
  placeholder,
  startAdornment,
  onChange,
  disabled, // Allow disabling the field
  type,
  InputProps,
}: any) {
  return (
    <Grid component={form} onSubmit={onSubmit}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            label=""
            variant="outlined"
            fullWidth={fullWidth}
            {...field} // React Hook Form automatically manages value and onChange
            error={error}
            size="small"
            type={type || "text"}
            onChange={(e) => {
              field.onChange(e); // Ensure React Hook Form captures changes
              onChange && onChange(e); // Custom onChange handler if provided
            }}
            disabled={disabled}
            InputProps={{
              ...InputProps,
              className: className,
              startAdornment: startAdornment,
            }}
            placeholder={placeholder}
          />
        )}
      />
      {errorCondition}
    </Grid>
  );
}
