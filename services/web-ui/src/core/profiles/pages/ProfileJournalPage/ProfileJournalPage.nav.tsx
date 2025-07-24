import { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { DateRange, DateRangePicker } from "src/components/ui";
import { useTranslation } from "src/core/i18n";

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

      <DateRangePicker fullWidth onChange={onDateChange} value={values} />

      {children}
    </Nav>
  );
}
