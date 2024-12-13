import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import { customSelectProps } from "../../customDataTypes/datatypes";
import styles from "../../Styles/customValidation.module.css";

const CustomSelect = ({
  error,
  errorCondition,
  onSubmit,
  control,
  name,
  form,
  selectData,
  placeHolder,
  sx,
  className,
  selectFieldCss,
  onChange,
  fullWidth,
}: customSelectProps) => {
  return (
    <Grid>
      <Grid component={form} onSubmit={onSubmit}>
        <FormControl
          fullWidth={fullWidth}
          className={`${styles.formControl} ${selectFieldCss}`}
          sx={{ width: 225 }}
        >
          <InputLabel id="selectOption-label"></InputLabel>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                id="demo-simple-select-autowidth"
                autoWidth
                labelId="selectOption-label"
                label=""
                error={error}
                size="small"
                displayEmpty
                sx={sx}
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) {
                    onChange(e);
                  }
                }}
              >
                <MenuItem value="" className={styles.menuItem}>
                  <span className={styles.placeholder}>{placeHolder}</span>
                </MenuItem>

                {Array.isArray(selectData) ? (
                  selectData.map((item: any) => (
                    <MenuItem
                      key={item.id}
                      value={item.type}
                      className={styles.menuItemList}
                    >
                      <span className={className}>{item.name}</span>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No data available</MenuItem>
                )}
              </Select>
            )}
          />

          {errorCondition}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CustomSelect;
