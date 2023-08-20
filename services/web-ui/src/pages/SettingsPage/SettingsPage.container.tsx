import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box, FormControlLabel, FormGroup } from "@mui/material";

import { SettingsDetails } from "src/api";
import { settingsApi } from "src/apis";
import { Switch } from "src/components/ui";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { SettingsPageHeader } from "./SettingsPage.header";
import { SettingsPageSkeleton } from "./SettingsPage.skeleton";

export function SettingsPageContainer(): React.ReactElement {
  const { t } = useTranslation("settings");

  const queryClient = useQueryClient();
  const { error, data, isLoading } = useQuery(CacheKeysConstants.Settings, () =>
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
        queryClient.invalidateQueries([CacheKeysConstants.Settings]);
      },
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
            disabled={isLoading || mutation.isLoading}
            label={t("darkmode")}
          />
        </FormGroup>
      </Box>
    </Box>
  );
}
