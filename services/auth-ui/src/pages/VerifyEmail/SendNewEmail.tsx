import { ReactElement, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";
import { captureException } from "@sentry/react";

import { sendVerificationEmail } from "src/api/auth";
import { Button } from "src/components/ui/Button";
import { useTranslation } from "src/core/i18n";

export function SendNewEmail(): ReactElement {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSendNewEmail = async () => {
    setIsLoading(true);
    setError("");

    try {
      await sendVerificationEmail();
      setEmailSent(true);
    } catch (error) {
      captureException(error);
      setError(t("verifyEmail.sendError"));
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
        {t("verifyEmail.instructions")}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      {emailSent && (
        <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
          {t("verifyEmail.sendSuccess")}
        </Alert>
      )}

      <Button
        disabled={emailSent}
        loading={isLoading}
        onClick={handleSendNewEmail}
        variant="outlined"
      >
        {t("verifyEmail.sendNewEmail")}
      </Button>
    </Box>
  );
}
