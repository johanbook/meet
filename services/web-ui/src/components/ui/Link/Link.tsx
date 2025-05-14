import React from "react";
import {
  LinkProps,
  Link as ReactRouterLink,
  useSearchParams,
} from "react-router";

import { Link as MuiLink } from "@mui/material";

export function Link({ to, ...props }: LinkProps): React.ReactElement {
  const searchParams = useSearchParams()[0];

  const href = `${to}?${searchParams.toString()}`;

  return <MuiLink component={ReactRouterLink} to={href} {...props} />;
}
