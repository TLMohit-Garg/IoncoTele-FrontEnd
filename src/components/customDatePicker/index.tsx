// import React, { useEffect } from "react";
// import { Controller } from "react-hook-form";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { Grid } from "@mui/material";
// import dayjs from "dayjs"; // Import dayjs directly
// import { Dayjs } from "dayjs";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Props {
//   className?: string;
//   label?: string;
//   open?: boolean;
//   onClose?: () => void;
//   selectedDate?: Date | null;
//   onChange?: (date: Date | null) => void;
//   dateValue?: Dayjs | null;
//   minDate?: Dayjs | undefined;
//   maxDate?: Dayjs | undefined;
//   monthYearOnly?: boolean;
// }

// export default function CustomDatePicker({
//   error,
//   errorCondition,
//   control,
//   name,
//   className,
//   onChange,
//   selectedDate,
//   monthYearOnly = false,
//   maxDate = undefined,
// }: any) {
//   const [value, setValue] = React.useState<Dayjs | null>(null);

//   useEffect(() => {
//     if (selectedDate) {
//       setValue(dayjs(selectedDate));
//     }
//   }, [selectedDate]);

//   return (
//     <Grid>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={null}
//         render={({ field }) => (
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               {...field}
//               className={className}
//               sx={{ width: "100%" }}
//               slotProps={{
//                 textField: {
//                   error: error,
//                 },
//               }}
//               value={value}
//               onChange={(date: Dayjs | null) => {
//                 field.onChange(date?.toDate() || null);
//                 if (onChange) {
//                   onChange(date?.toDate() || null);
//                 }
//               }}
//               views={
//                 monthYearOnly ? ["year", "month"] : ["year", "month", "day"]
//               }
//               maxDate={maxDate}
//             />
//           </LocalizationProvider>
//         )}
//       />
//       {errorCondition}
//     </Grid>
//   );
// }
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // Updated to DateTimePicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import dayjs from "dayjs"; // Import dayjs directly
import { Dayjs } from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  className?: string;
  label?: string;
  open?: boolean;
  onClose?: () => void;
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
  dateValue?: Dayjs | null;
  minDate?: Dayjs | undefined;
  maxDate?: Dayjs | undefined;
  monthYearOnly?: boolean;
  showTimePicker?: boolean; // Added this prop to toggle date and time picker
}

export default function CustomDatePicker({
  error,
  errorCondition,
  control,
  name,
  className,
  onChange,
  selectedDate,
  monthYearOnly = false,
  maxDate = undefined,
  showTimePicker = false, // Added the showTimePicker prop
}: any) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    if (selectedDate) {
      setValue(dayjs(selectedDate));
    }
  }, [selectedDate]);

  return (
    <Grid>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Use DateTimePicker for both date and time selection */}
            <DateTimePicker
              {...field}
              className={className}
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  error: error,
                },
              }}
              value={value}
              onChange={(date: Dayjs | null) => {
                field.onChange(date?.toDate() || null);
                if (onChange) {
                  onChange(date?.toDate() || null);
                }
              }}
              views={
                showTimePicker
                  ? ["year", "month", "day", "hours", "minutes"] // Include time selection
                  : monthYearOnly
                  ? ["year", "month"]
                  : ["year", "month", "day"]
              }
              maxDate={maxDate}
            />
          </LocalizationProvider>
        )}
      />
      {errorCondition}
    </Grid>
  );
}
