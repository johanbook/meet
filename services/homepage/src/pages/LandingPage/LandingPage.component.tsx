import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { CONFIG } from "src/config";
import { useTranslation } from "src/core/i18n";

export function LandingPageComponent(): React.ReactElement {
  const { t } = useTranslation();

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
          {t("landingpage.hero.text")}
        </Typography>

        <Center>
          <Button component="a" href={CONFIG.URLS.APP} variant="contained">
            {t("landingpage.hero.signup")}
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
