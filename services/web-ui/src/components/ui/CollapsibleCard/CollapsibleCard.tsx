import { ReactElement, ReactNode, useState } from "react";

import { KeyboardArrowDownRounded } from "@mui/icons-material";
import {
  ButtonBase,
  Collapse,
  IconButton,
  SxProps,
  Typography,
} from "@mui/material";

import { Card } from "../Card";

interface CollapsibleCardProps {
  children: ReactNode;
  openByDefault?: boolean;
  sx?: SxProps;
  title: string;
}

export function CollapsibleCard({
  children,
  openByDefault = false,
  sx,
  title,
}: CollapsibleCardProps): ReactElement {
  const [open, setOpen] = useState(openByDefault);

  return (
    <Card sx={sx}>
      <ButtonBase onClick={() => setOpen(!open)} sx={{ width: "100%" }}>
        <Typography align="left" sx={{ flexGrow: 1 }} variant="h5">
          {title}
        </Typography>

        <IconButton>
          <KeyboardArrowDownRounded
            sx={{ transform: open ? "rotate(180deg)" : undefined }}
          />
        </IconButton>
      </ButtonBase>

      <Collapse in={open}>{children} </Collapse>
    </Card>
  );
}
