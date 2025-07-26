import { ReactElement } from "react";

import { Box, FormControlLabel, FormGroup } from "@mui/material";

import { SettingsDetails } from "src/api";
import { settingsApi } from "src/apis";
import { Switch } from "src/components/ui";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { AppearancePageNav } from "./AppearancePage.nav";
import { AppearancePageSkeleton } from "./AppearancePage.skeleton";

export function AppearancePageContainer(): ReactElement {
  const { t } = useTranslation("settings");

  const queryClient = useQueryClient();
  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeyEnum.Settings],
    queryFn: () => settingsApi.getCurrentSettings(),
  });

  // TODO: Investigate why type is incorrect here
  const mutation = useMutation({
    mutationFn: (body: object) => settingsApi.updateCurrentSettings({ body }),
  });

  if (error) {
    return (
      <AppearancePageNav>
        <ErrorView />
      </AppearancePageNav>
    );
  }

  if (isPending) {
    return (
      <AppearancePageNav>
        <AppearancePageSkeleton />
      </AppearancePageNav>
    );
  }

  if (!data) {
    return (
      <AppearancePageNav>
        <ErrorView message="Settings not found" />
      </AppearancePageNav>
    );
  }

  async function handleChange(settings: SettingsDetails): Promise<void> {
    await mutation.mutateAsync(settings, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.Settings],
        });
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
      <AppearancePageNav>
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
              disabled={isPending || mutation.isPending}
              label={t("darkmode")}
            />
          </FormGroup>
        </Box>
      </AppearancePageNav>
    </Box>
  );
}
