import { FC } from "react";

import { Typography } from "@mui/material";

import { config } from "src/config";

export const Logo: FC = () => (
  <Typography
    sx={(theme) => ({
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      backgroundClip: "text",
      color: "transparent",
      fontFamily: "sans-serif",
      fontWeight: 600,
      ml: 3,
      textShadow: `1px 1px 1px ${theme.palette.text.primary}`,
      userSelect: "none",
    })}
    variant="h5"
  >
    {config.APP.NAME}
  </Typography>
);
