import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";

interface CreateBookingPageNavProps {
  children: ReactNode;
}

export function CreateBookingPageNav({
  children,
}: CreateBookingPageNavProps): ReactElement {
  return (
    <Nav navBackTo="/bookings" padding="normal" title="Create booking">
      {children}
    </Nav>
  );
}
