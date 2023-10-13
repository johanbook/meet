import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box, FormControlLabel, FormGroup } from "@mui/material";

import { SettingsDetails } from "src/api";
import { settingsApi } from "src/apis";
import { Link, List, ListItem, Typography } from "src/components/ui";
import { Switch } from "src/components/ui";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

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
        <ErrorView error={error} />
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
        <ErrorView error="Settings not found" />
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

      <Typography gutterBottom sx={{ paddingTop: 3 }} variant="h5">
        {t("advanced.header")}
      </Typography>

      <List>
        <ListItem>
          <Link to="/group/list">{t("advanced.links.list-organizations")}</Link>
        </ListItem>
        <ListItem>
          <Link to="/group">{t("advanced.links.current-organization")}</Link>
        </ListItem>
        <ListItem>
          <Link to="/journal">{t("advanced.links.journal")}</Link>
        </ListItem>
      </List>
    </Box>
  );
}
