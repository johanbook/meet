import { ReactElement, ReactNode } from "react";

import { Box, Grid, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { DatePicker } from "src/components/ui/DatePicker";
import { useTranslation } from "src/core/i18n";

export interface DateRange {
  from: Date;
  to: Date;
}

interface OrganizationJournalPageNavProps {
  children: ReactNode;
  onDateChange: (value: DateRange) => void;
  values: DateRange;
}

export function OrganizationJournalPageNav({
  children,
  onDateChange,
  values,
}: OrganizationJournalPageNavProps): ReactElement {
  const { t } = useTranslation("journal");

  return (
    <Nav navBackTo="/profile" title={t("header")}>
      <Box sx={{ pt: 1, px: 3 }}>
        <Typography color="textSecondary" sx={{ paddingBottom: 3 }}>
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
      </Box>
    </Nav>
  );
}
