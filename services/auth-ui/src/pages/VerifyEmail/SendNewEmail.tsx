import { ReactElement, useState } from "react";

import { Box, Typography } from "@mui/material";
import { captureException } from "@sentry/react";

import { sendVerificationEmail } from "src/api/auth";
import { Button } from "src/components/ui/Button";
import { useTranslation } from "src/core/i18n";

export function SendNewEmail(): ReactElement {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSendNewEmail = async () => {
    setIsLoading(true);

    try {
      await sendVerificationEmail();
    } catch (error) {
      captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography align="center" gutterBottom variant="h4">
        {t("verifyEmail.title")}
      </Typography>

      <Typography align="center" sx={{ mb: 4 }}>
        To start using the app you must first confirm your email. An
        verification email has been sent to you. If you did not get it, press
        the button below.
      </Typography>

      <Button
        loading={isLoading}
        onClick={handleSendNewEmail}
        variant="outlined"
      >
        Send new email
      </Button>
    </Box>
  );
}
