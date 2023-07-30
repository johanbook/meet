import { ReactElement } from "react";

import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

export interface DatePickerProps {
  fullWidth?: boolean;
  onChange: (date: Date) => void;
  sx?: SxProps;
  value: Date;
}

export function DatePicker({
  onChange,
  value,
  ...props
}: DatePickerProps): ReactElement {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label="Controlled picker"
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            onChange(newValue.toDate());
          }
        }}
        value={dayjs(value)}
        {...props}
      />
    </LocalizationProvider>
  );
}
