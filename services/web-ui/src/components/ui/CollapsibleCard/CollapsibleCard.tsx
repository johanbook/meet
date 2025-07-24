import { ReactElement, ReactNode, useState } from "react";

import { KeyboardArrowDownRounded } from "@mui/icons-material";
import {
  Box,
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
      <Box
        onClick={() => setOpen(!open)}
        sx={{ display: "flex", width: "100%" }}
      >
        <ButtonBase sx={{ flexGrow: 1 }}>
          <Typography align="left" sx={{ width: "100%" }} variant="h5">
            {title}
          </Typography>
        </ButtonBase>

        <IconButton>
          <KeyboardArrowDownRounded
            sx={(theme) => ({
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
              }),
            })}
          />
        </IconButton>
      </Box>

      <Collapse in={open}>{children} </Collapse>
    </Card>
  );
}
