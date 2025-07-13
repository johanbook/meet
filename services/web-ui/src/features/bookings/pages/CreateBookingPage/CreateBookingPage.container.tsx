import { ReactElement } from "react";

import { CreateBookingPageComponent } from "./CreateBookingPage.component";
import { CreateBookingPageNav } from "./CreateBookingPage.nav";

export function CreateBookingPageContainer(): ReactElement {
  return (
    <CreateBookingPageNav>
      <CreateBookingPageComponent />
    </CreateBookingPageNav>
  );
}
