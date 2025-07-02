import { FC, SyntheticEvent, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";

import { submitNewPassword } from "src/api/auth";
import { Button } from "src/components/ui/Button";
import { Link } from "src/components/ui/Link";
import { TextField } from "src/components/ui/TextField";
import { useTranslation } from "src/core/i18n";

export const ResetPasswordFromToken: FC = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const handleSubmitNewPassword = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setPasswordError("");

    try {
      const response = await submitNewPassword(password);

      if (response.status === "FIELD_ERROR") {
        const field = response.formFields[0];
        if (field.id === "password") {
          setPasswordError(field.error);
        }
        return;
      }

      if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
        setError(t("resetPasswordFromToken.invalidToken"));
        return;
      }

      // Assume success if no error status
      setPasswordSubmitted(true);
    } catch {
      setError(t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmitNewPassword}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Typography variant="h4">{t("resetPasswordFromToken.title")}</Typography>
      <Typography color="textSecondary" gutterBottom>
        {t("resetPasswordFromToken.instructions")}
      </Typography>

      <TextField
        autoComplete="new-password"
        disabled={isLoading || passwordSubmitted}
        error={passwordError}
        fullWidth
        label={t("fields.password.label")}
        name="password"
        onChange={(value) => setPassword(value)}
        type="password"
        value={password}
      />

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      {passwordSubmitted && (
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("resetPasswordFromToken.success")}
        </Alert>
      )}

      <Button
        disabled={!password || passwordSubmitted}
        loading={isLoading}
        fullWidth
        type="submit"
        variant="contained"
      >
        {t("resetPasswordFromToken.button")}
      </Button>

      <Link to="/login">{t("resetPasswordFromToken.backToLogin")}</Link>
    </Box>
  );
};
