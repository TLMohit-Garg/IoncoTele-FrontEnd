import React from "react";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from "../../Styles/phoneInput.module.css";

interface PhoneInputInterface {
  error?: boolean;
  control?: Control<any>;
  name?: any;
  form?: any;
  helperText?: string;
  searchStyle?: any;
  classes?: string;
  containerStyle?: any;
  inputStyle?: any;
  containerClass?: any;
  inputClass?: any;
  placeholder?: string;
  errstyle?: any;
}

const PhoneInput = ({
  error,
  control,
  name,
  form,
  helperText,
  searchStyle,
  classes,
  containerStyle,
  inputStyle,
  containerClass,
  inputClass,
  placeholder,
  errstyle,
}: PhoneInputInterface) => {
  return (
    <Grid>
      <Grid component={form}>
        <FormControl fullWidth={true} classes={classes}>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <ReactPhoneInput
                  {...field}
                  country="us"
                  searchClass="search-class"
                  containerStyle={containerStyle}
                  disableSearchIcon
                  inputStyle={inputStyle}
                  searchStyle={searchStyle}
                  containerClass={containerClass}
                  inputClass={inputClass}
                  placeholder={placeholder}
                />
                {helperText && error && (
                  <FormHelperText className={`${styles.errorMsg} ${errstyle}`}>
                    {helperText}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PhoneInput;