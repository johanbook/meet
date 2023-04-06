import React from "react";
import { Link as RouterLink } from "react-router-dom";

import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { accumulate, getLastAndRemainder } from "../../../utils/array";

export interface BreadcrumbsProps {
  createLink: (segments: string[]) => string;
  links: string[];
  root: string;
}

export default function Breadcrumbs({
  createLink,
  links,
  root,
}: BreadcrumbsProps): React.ReactElement {
  const [last, elements] = getLastAndRemainder(links);

  const accumulated = accumulate(
    elements,
    (element: string, previous: string[] = []) => [...previous, element]
  );

  return (
    <div role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">
        <MuiLink
          color="inherit"
          component={RouterLink}
          to="/"
          underline="hover"
        >
          {root}
        </MuiLink>

        {accumulated.map((segments) => (
          <MuiLink
            color="inherit"
            component={RouterLink}
            key={segments.join("-")}
            to={createLink(segments)}
            underline="hover"
          >
            {segments.at(-1)}
          </MuiLink>
        ))}

        <Typography color="text.primary">{last}</Typography>
      </MuiBreadcrumbs>
    </div>
  );
}
