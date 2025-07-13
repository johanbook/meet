import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateBookingPageNavProps {
  children: ReactNode;
}

export function CreateBookingPageNav({
  children,
}: CreateBookingPageNavProps): ReactElement {
  const { t } = useTranslation("core");

  return (
    <Nav
      navBackTo="/bookings"
      padding="normal"
      title={t("navigation.bookings")}
    >
      {children}
    </Nav>
  );
}
