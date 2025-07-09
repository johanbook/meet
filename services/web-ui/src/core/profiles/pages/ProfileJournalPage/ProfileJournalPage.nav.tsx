import { ReactElement, ReactNode } from "react";

import { Grid, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { DatePicker } from "src/components/ui/DatePicker";
import { useTranslation } from "src/core/i18n";

export interface DateRange {
  from: Date;
  to: Date;
}

interface ProfileJournalPageNavProps {
  children: ReactNode;
  onDateChange: (value: DateRange) => void;
  values: DateRange;
}

export function ProfileJournalPageNav({
  children,
  onDateChange,
  values,
}: ProfileJournalPageNavProps): ReactElement {
  const { t } = useTranslation("journal");

  return (
    <Nav navBackTo="/profile" padding="normal" title={t("header")}>
      <Typography color="textSecondary" sx={{ pb: 4 }}>
        {t("description")}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <DatePicker
            fullWidth
            label="From"
            onChange={(from) => onDateChange({ ...values, from })}
            value={values.from}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <DatePicker
            fullWidth
            label="To"
            onChange={(to) => onDateChange({ ...values, to })}
            value={values.to}
          />
        </Grid>
      </Grid>

      {children}
    </Nav>
  );
}
