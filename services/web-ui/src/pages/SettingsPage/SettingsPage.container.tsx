import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Box, FormControlLabel, FormGroup } from "@mui/material";

import { SettingsDetails } from "src/api";
import { settingsApi } from "src/apis";
import { Switch } from "src/components/ui";

import { ErrorPage } from "../ErrorPage";
import { SettingsPageHeader } from "./SettingsPage.header";
import { SettingsPageSkeleton } from "./SettingsPage.skeleton";

export function SettingsPageContainer(): React.ReactElement {
  const queryClient = useQueryClient();
  const { error, data, isLoading } = useQuery(`settings`, () =>
    settingsApi.getCurrentSettings()
  );

  // TODO: Investigate why type is incorrect herej
  const mutation = useMutation((body: object) =>
    settingsApi.updateCurrentSettings({ body })
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

  async function handleChange(settings: SettingsDetails): Promise<void> {
    await mutation.mutateAsync(settings, {
      onSuccess: () => {
        queryClient.invalidateQueries(["settings"]);
      },
    });
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
            control={
              <Switch
                onChange={(value) =>
                  handleChange({
                    ...data,
                    darkmode: value,
                  })
                }
                value={data.darkmode}
              />
            }
            label="Darkmode"
          />
        </FormGroup>
      </Box>
    </Box>
  );
}
