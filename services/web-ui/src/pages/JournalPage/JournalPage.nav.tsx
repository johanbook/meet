import { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";

import { DatePicker } from "src/components/ui/DatePicker";
import { useTranslation } from "src/core/i18n";

export interface DateRange {
  from: Date;
  to: Date;
}

interface JournalPageNavProps {
  children: ReactNode;
  onDateChange: (value: DateRange) => void;
  values: DateRange;
}

export function JournalPageNav({
  children,
  onDateChange,
  values,
}: JournalPageNavProps): ReactElement {
  const { t } = useTranslation("journal");

  return (
    <>
      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>
      <Typography color="textSecondary" sx={{ paddingBottom: 2 }}>
        {t("description")}
      </Typography>

      <DatePicker
        label="From"
        onChange={(from) => onDateChange({ ...values, from })}
        sx={{ marginRight: 2 }}
        value={values.from}
      />

      <DatePicker
        label="To"
        onChange={(to) => onDateChange({ ...values, to })}
        value={values.to}
      />

      {children}
    </>
  );
}
