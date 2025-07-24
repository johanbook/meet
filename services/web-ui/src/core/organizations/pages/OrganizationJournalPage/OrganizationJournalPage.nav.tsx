import { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { DateRangePicker } from "src/components/ui";
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
    <Nav navBackTo="/profile" padding="normal" title={t("header")}>
      <Typography color="textSecondary" sx={{ paddingBottom: 3 }}>
        {t("description")}
      </Typography>

      <DateRangePicker fullWidth onChange={onDateChange} value={values} />

      {children}
    </Nav>
  );
}
