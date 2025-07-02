import { FC } from "react";

import { getResetPasswordTokenFromURL } from "src/api/auth";

import { PasswordResetFromToken } from "./PasswordResetFromToken";
import { RequestPasswordReset } from "./RequestPasswordReset";

export const ResetPassword: FC = () => {
  const token = getResetPasswordTokenFromURL();

  if (token) {
    return <PasswordResetFromToken />;
  }

  return <RequestPasswordReset />;
};
