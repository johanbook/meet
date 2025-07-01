import { FC, SyntheticEvent, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";

import { Button } from "src/components/ui/Button";
import { Link } from "src/components/ui/Link";
import { TextField } from "src/components/ui/TextField";
import { useTranslation } from "src/core/i18n";

import { doSignup } from "./utils";

export const SignUp: FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await doSignup(email, password);

      if (response.status === "FIELD_ERROR") {
        const field = response.formFields[0];

        if (field.id === "email") {
          setEmailError(field.error);
        }

        return;
      }

      // Login was successful
      const searchParams = new URLSearchParams(window.location.search);
      window.location.href = searchParams.get("redirectToPath") || "/";
    } catch {
      setError("There was an error");
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
      <Typography variant="h4">Sign Up</Typography>

      <Typography>
        Already have an account? <Link to="/login"> Log In</Link>
      </Typography>

      <TextField
        autoComplete="email"
        fullWidth
        label="Email"
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
        Sign Up
      </Button>

      <Typography color="textSecondary" variant="body2">
        By continuing you accept our Privacy Policy
      </Typography>
    </Box>
  );
};
