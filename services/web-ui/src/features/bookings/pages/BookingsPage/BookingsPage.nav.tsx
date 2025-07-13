import { ReactElement, ReactNode } from "react";

import { CalendarMonthRounded } from "@mui/icons-material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface BookingsPageNavProps {
  children: ReactNode;
}

export function BookingsPageNav({
  children,
}: BookingsPageNavProps): ReactElement {
  const { t } = useTranslation("core");

  return (
    <Nav padding="normal" title={t("navigation.bookings")}>
      <Fab to="/bookings/create">
        <CalendarMonthRounded />
      </Fab>

      {children}
    </Nav>
  );
}
