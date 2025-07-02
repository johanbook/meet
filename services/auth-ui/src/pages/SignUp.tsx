import { FC, SyntheticEvent, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";

import { signUp } from "src/api/auth";
import { Button } from "src/components/ui/Button";
import { Link } from "src/components/ui/Link";
import { TextField } from "src/components/ui/TextField";
import { useTranslation } from "src/core/i18n";

export const SignUp: FC = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setEmailError("");
    setPasswordError("");
    setError("");

    try {
      const response = await signUp(email, password);

      if (response.status === "FIELD_ERROR") {
        const field = response.formFields[0];

        if (field.id === "email") {
          setEmailError(field.error);
        }

        if (field.id === "password") {
          setPasswordError(field.error);
        }

        return;
      }

      // Login was successful
      const searchParams = new URLSearchParams(window.location.search);
      window.location.href = searchParams.get("redirectToPath") || "/";
    } catch {
      setError(t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignUp}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Box>
        <Typography align="center" gutterBottom variant="h4">
          {t("signup.title")}
        </Typography>

        <Typography align="center">
          {t("signup.alreadyHaveAccount")}{" "}
          <Link to="/login"> {t("signup.logInLink")}</Link>
        </Typography>
      </Box>

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

      <TextField
        autoComplete="current-password"
        disabled={isLoading}
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

      <Button
        disabled={!email || !password}
        loading={isLoading}
        fullWidth
        type="submit"
        variant="contained"
      >
        {t("signup.button")}
      </Button>

      <Typography color="textSecondary" variant="body2">
        {t("signup.acceptPrivacy")}
      </Typography>
    </Box>
  );
};
