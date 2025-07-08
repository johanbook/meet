import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { Box } from "@mui/material";

import { useTranslation } from "src/core/i18n";
import { useSnackbar } from "src/core/snackbar";

import { CreateTimeSeriesPageComponent } from "./CreateTimeSeriesPage.component";
import { CreateTimeSeriesPageNav } from "./CreateTimeSeriesPage.nav";

export function CreateTimeSeriesPageContainer(): ReactElement {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("timeseries-creation");

  const handleSubmit = () => {
    snackbar.success(t("actions.create.success"));
    navigate("/time-series");
  };

  return (
    <CreateTimeSeriesPageNav>
      <Box sx={{ p: 2 }}>
        <CreateTimeSeriesPageComponent onAfterSubmit={handleSubmit} />
      </Box>
    </CreateTimeSeriesPageNav>
  );
}
