import { ReactElement } from "react";

import { Grid } from "@mui/material";

import { DatePicker } from "../DatePicker";

interface DateRange {
  to: Date;
  from: Date;
}

interface DateRangePickerProps {
  fullWidth?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onChange: (range: DateRange) => void;
  value: DateRange;
}

export function DateRangePicker({
  onChange,
  value,
  ...props
}: DateRangePickerProps): ReactElement {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6 }}>
        <DatePicker
          label="From"
          onChange={(from) => onChange({ ...value, from })}
          value={value.from}
          {...props}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <DatePicker
          label="To"
          onChange={(to) => onChange({ ...value, to })}
          value={value.to}
          {...props}
        />
      </Grid>
    </Grid>
  );
}
