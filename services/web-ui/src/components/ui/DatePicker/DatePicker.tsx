import { ReactElement } from "react";

import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

export interface DatePickerProps {
  fullWidth?: boolean;
  label: string;
  onChange: (date: Date) => void;
  sx?: SxProps;
  value: Date;
}

export function DatePicker({
  fullWidth,
  label,
  onChange,
  value,
  ...props
}: DatePickerProps): ReactElement {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            onChange(newValue.toDate());
          }
        }}
        slotProps={{
          textField: {
            fullWidth,
          },
        }}
        value={dayjs(value)}
        {...props}
      />
    </LocalizationProvider>
  );
}
