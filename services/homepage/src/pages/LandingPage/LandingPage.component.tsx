import React from "react";

import { Box, Button, Typography } from "@mui/material";

import BackgroundImage from "src/assets/images/background.png";
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
      <img
        alt=""
        src={BackgroundImage}
        style={{
          objectFit: "cover",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: -5,
          width: "100%",
          height: "100%",
        }}
      />

      <Box>
        <Typography
          color="white"
          gutterBottom
          sx={{
            mb: 4,
            textShadow: `1px 1px 1px black`,
          }}
          variant="h3"
        >
          {t("landingpage.hero.text")}
        </Typography>

        <Center>
          <Button
            component="a"
            href={CONFIG.URLS.SIGNUP_UP}
            size="large"
            sx={({ palette }) => ({
              backgroundImage: `linear-gradient(to left, ${palette.primary.light}, ${palette.secondary.main})`,
              fontWeight: 600,
            })}
            variant="contained"
          >
            {t("landingpage.hero.signup")}
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
