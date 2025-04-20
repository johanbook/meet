import React from "react";

import { Box, Button, Link, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { CONFIG } from "src/config";
import { useTranslation } from "src/core/i18n";

export function LandingPage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        color="white"
        gutterBottom
        sx={{
          mb: 4,
          textAlign: "center",
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

      <Typography
        sx={{
          fontWeight: 200,
          color: "white",
          position: "absolute",
          bottom: 0,
          right: 0,
          p: 2,
          zIndex: 10,
        }}
      >
        Made by{" "}
        <Link
          href="https://johanbook.com"
          rel="noopener"
          sx={{ fontWeight: 500 }}
          target="_blank"
        >
          Johan Book
        </Link>
      </Typography>
    </Box>
  );
}
