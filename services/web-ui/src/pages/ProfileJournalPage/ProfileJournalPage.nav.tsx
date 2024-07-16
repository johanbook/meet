import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";

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

  const appBarContent = (
    <>
      <IconButton
        component={ReactRouterLink}
        sx={{
          mr: 2,
        }}
        to="/profile"
      >
        <ArrowBack />
      </IconButton>

      <Typography variant="h5">{t("header")}</Typography>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ pt: 1, px: 3 }}>
        <Typography color="textSecondary" sx={{ paddingBottom: 3 }}>
          {t("description")}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              fullWidth
              label="From"
              onChange={(from) => onDateChange({ ...values, from })}
              value={values.from}
            />
          </Grid>

          <Grid item xs={6}>
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
