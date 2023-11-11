import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { Dialog } from "src/components/ui/Dialog";
import { useTranslation } from "src/core/i18n";

export interface ProfileCreatedDialogProps {}

export function ProfileCreatedDialog(): ReactElement {
  const { t } = useTranslation("profile-creation");

  return (
    <Dialog>
      <Typography>Congrats</Typography>

      <Typography>{t("actions.create.success")}</Typography>
    </Dialog>
  );
}
