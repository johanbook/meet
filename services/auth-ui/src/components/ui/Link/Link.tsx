import React, { ReactNode } from "react";
import { Link as ReactRouterLink, useSearchParams } from "react-router";

import { Link as MuiLink } from "@mui/material";

interface LinkProps {
  children: ReactNode;
  to: string;
}

export function Link({ to, ...props }: LinkProps): React.ReactElement {
  const searchParameters = useSearchParams()[0];

  const href = `${to}?${searchParameters.toString()}`;

  return <MuiLink component={ReactRouterLink} to={href} {...props} />;
}
