import React from "react";
import { useQuery } from "react-query";

import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";

import { settingsApi } from "src/apis";

import { ErrorPage } from "../ErrorPage";
import { SettingsPageHeader } from "./SettingsPage.header";
import { SettingsPageSkeleton } from "./SettingsPage.skeleton";

export function SettingsPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery(`settings`, () =>
    settingsApi.getCurrentSettings()
  );

  if (error) {
    return (
      <>
        <SettingsPageHeader />
        <ErrorPage error={error} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <SettingsPageHeader />
        <SettingsPageSkeleton />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <SettingsPageHeader />
        <ErrorPage error={new Error("Settings not found")} />
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <SettingsPageHeader />

      <Box sx={{ flexGrow: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={<Switch value={data.darkmode} />}
            label="Darkmode"
          />
        </FormGroup>
      </Box>
    </Box>
  );
}
