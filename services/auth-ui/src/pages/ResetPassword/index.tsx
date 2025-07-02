import { FC } from "react";

import { getResetPasswordTokenFromURL } from "src/api/auth";

import { RequestPasswordReset } from "./RequestPasswordReset";

export const PasswordReset: FC = () => {
  const token = getResetPasswordTokenFromURL();

  if (token) {
    return <p>hi</p>;
  }

  return <RequestPasswordReset />;
};
