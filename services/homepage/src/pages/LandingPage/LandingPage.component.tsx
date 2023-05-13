import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { CONFIG } from "src/config";

export function LandingPageComponent(): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box>
        <Typography color="primary" gutterBottom variant="h3">
          Meet someone
        </Typography>

        <Center>
          <Button component="a" href={CONFIG.URLS.APP} variant="contained">
            Sign up
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
