import { ReactElement, useState } from "react";

import { GlobalDialogProps } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { useLogger } from "src/core/logging";
import { useSnackbar } from "src/core/snackbar";

import { Button } from "../Button";
import { Dialog } from "../Dialog";

export interface ConfirmationDialogProps extends GlobalDialogProps {
  description: string;
  onConfirm: (onSuccess: () => void) => void | Promise<void>;
  title: string;
}

export function ConfirmationDialog({
  description,
  onConfirm,
  title,
  ...props
}: ConfirmationDialogProps): ReactElement {
  const logger = useLogger(ConfirmationDialog.name);
  const snackbar = useSnackbar();
  const { t } = useTranslation("core");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      Actions={({ closeDialog }) => (
        <>
          <Button disabled={isLoading} onClick={closeDialog} variant="outlined">
            {t("general.cancel")}
          </Button>
          <Button
            color="error"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              try {
                await onConfirm(closeDialog);
              } catch (error) {
                logger.error("Error when executing handler", { error });

                // TODO: Add translations
                snackbar.error("An unexpected error occured");
              } finally {
                setIsLoading(false);
              }
            }}
            variant="contained"
          >
            {t("general.confirm")}
          </Button>
        </>
      )}
      title={title}
      {...props}
    >
      {description}
    </Dialog>
  );
}
