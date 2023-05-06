import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Link as MuiLink, Typography } from "@mui/material";

export function ChatPageHeader(): React.ReactElement {
  return (
    <>
      <MuiLink
        component={ReactRouterLink}
        sx={{
          display: "Flex",
          alignItems: "center",
          paddingBottom: 1,
        }}
        to="/chat"
        underline="hover"
      >
        <ArrowBackIosNew fontSize="small" />
        <span>Back</span>
      </MuiLink>
      <Typography variant="h5">Chat</Typography>
    </>
  );
}
