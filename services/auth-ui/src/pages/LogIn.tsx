import { FC, SyntheticEvent, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";

import { Button } from "src/components/ui/Button";
import { Link } from "src/components/ui/Link";
import { TextField } from "src/components/ui/TextField";
import { useTranslation } from "src/core/i18n";

import { login } from "./utils";

export const LogIn: FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await login(email, password);

      if (response.status === "FIELD_ERROR") {
        const field = response.formFields[0];

        if (field.id === "email") {
          setEmailError(field.error);
        }

        return;
      }

      if (response.status === "WRONG_CREDENTIALS_ERROR") {
        setError(t("errors.wrongCredentials"));
        return;
      }

      if (response.status === "SIGN_IN_NOT_ALLOWED") {
        setError(response.reason);
        return;
      }

      // Login was successful
      const searchParams = new URLSearchParams(window.location.search);
      window.location.href = searchParams.get("redirectToPath") || "/";
    } catch {
      setError(t("errors.generic"));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Typography variant="h4">{t("login.title")}</Typography>

      <Typography>
        {t("login.notSignedUp")}
        <Link to="/login/signup"> {t("login.signUpLink")} </Link>
      </Typography>

      <TextField
        autoComplete="email"
        fullWidth
        label={t("fields.email.label")}
        name="email"
        onChange={(value) => setEmail(value)}
        type="email"
        value={email}
      />
      {emailError}

      <TextField
        autoComplete="current-password"
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
        fullWidth
        type="submit"
        variant="contained"
      >
        {t("login.button")}
      </Button>
    </Box>
  );
};
