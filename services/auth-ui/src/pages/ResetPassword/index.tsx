import { FC } from "react";

import { getResetPasswordTokenFromURL } from "src/api/auth";

import { RequestPasswordReset } from "./RequestPasswordReset";
import { ResetPasswordFromToken } from "./ResetPasswordFromToken";

export const ResetPassword: FC = () => {
  const token = getResetPasswordTokenFromURL();

  if (token) {
    return <ResetPasswordFromToken />;
  }

  return <RequestPasswordReset />;
};
