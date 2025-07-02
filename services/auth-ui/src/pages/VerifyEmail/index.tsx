import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { verifyEmail } from "src/api/auth";
import { useTranslation } from "src/core/i18n";

export function VerifyEmail(): ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        const result = await verifyEmail();

        if (result.status == "OK") {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    handleVerifyEmail();
  }, []);

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

      {status === "verifying" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>{t("verifyEmail.verifying")}</Typography>
        </Box>
      )}

      {status === "success" && (
        <>
          <Typography sx={{ mt: 4 }}>{t("verifyEmail.success")}</Typography>
          <Button
            sx={{ mt: 4 }}
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            {t("verifyEmail.backToLogin")}
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <Typography color="error" sx={{ mt: 4 }}>
            {t("verifyEmail.error")}
          </Typography>
          <Button
            sx={{ mt: 4 }}
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            {t("verifyEmail.backToLogin")}
          </Button>
        </>
      )}
    </Box>
  );
}
