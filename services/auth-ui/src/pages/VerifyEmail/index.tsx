import { ReactElement } from "react";

import { getEmailVerificationTokenFromURL } from "src/api/auth";

import { SendNewEmail } from "./SendNewEmail";
import { VerifyEmailLink } from "./VerifyEmailLink";

export function VerifyEmail(): ReactElement {
  const token = getEmailVerificationTokenFromURL();

  if (token) {
    return <VerifyEmailLink />;
  }

  return <SendNewEmail />;
}
