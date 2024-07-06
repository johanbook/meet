import { ReactElement } from "react";

import { Box } from "@mui/material";

import { CurrentOrganizationDetails } from "src/api";
import { Button, TextField, Typography } from "src/components/ui";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";

interface OrganizationSettingsProps {
  data: CurrentOrganizationDetails;
}

export function OrganizationSettings({
  data,
}: OrganizationSettingsProps): ReactElement {
  const { t } = useTranslation("organization");
  const authorization = useAuthorization();

  if (authorization.error) {
    return <ErrorMessage error={authorization.error} />;
  }

  if (
    authorization.isLoading ||
    !authorization.hasPermission(Permissions.Organization.Edit)
  ) {
    return <></>;
  }

  return (
    <>
      <Typography sx={{ pt: 2 }} variant="h6">
        Settings
      </Typography>

      <Typography color="textSecondary">
        Here you can change settings of your group.
      </Typography>

      <TextField
        disabled
        fullWidth
        label={t("name")}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onChange={() => {}}
        sx={{ mt: 2 }}
        value={data.name}
      />

      <Box sx={{ pt: 2, display: "flex" }}>
        <Button disabled variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}
