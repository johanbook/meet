import { Box } from "@mui/material";

import { useTranslation } from "src/core/i18n";

import { Typography } from "../Typography";

export function TableNoData() {
  const { t } = useTranslation("core");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography>{t("table.no-data")}</Typography>
    </Box>
  );
}
