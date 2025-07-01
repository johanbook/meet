import { FC, SyntheticEvent, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";

import { resetPasswordByEmail } from "src/api/auth";
import { Button } from "src/components/ui/Button";
import { Link } from "src/components/ui/Link";
import { TextField } from "src/components/ui/TextField";
import { useTranslation } from "src/core/i18n";

export const ResetPassword: FC = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handlePasswordReset = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setEmailError("");
    setEmailSent(false);

    try {
      const response = await resetPasswordByEmail(email);

      if (response.status === "FIELD_ERROR") {
        const field = response.formFields[0];
        if (field.id === "email") {
          setEmailError(field.error);
        }
        return;
      }

      if (response.status === "PASSWORD_RESET_NOT_ALLOWED") {
        setError(t("resetPassword.notAllowed"));
        return;
      }

      // Assume success if no error status
      setEmailSent(true);
    } catch {
      setError(t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handlePasswordReset}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Typography variant="h4">{t("resetPassword.title")}</Typography>
      <Typography color="textSecondary" gutterBottom>
        {t("resetPassword.instructions")}
      </Typography>

      <TextField
        autoComplete="email"
        disabled={isLoading}
        error={emailError}
        fullWidth
        label={t("fields.email.label")}
        name="email"
        onChange={(value) => setEmail(value)}
        type="email"
        value={email}
      />

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      {emailSent && (
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("resetPassword.emailSent")}
        </Alert>
      )}

      <Button
        disabled={!email || isLoading}
        loading={isLoading}
        fullWidth
        type="submit"
        variant="contained"
      >
        {t("resetPassword.button")}
      </Button>

      <Link to="/login">{t("resetPassword.backToLogin")}</Link>
    </Box>
  );
};
