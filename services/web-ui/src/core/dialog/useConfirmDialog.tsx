import { ConfirmationDialog } from "src/components/ui";
import { ConfirmationDialogProps } from "src/components/ui/ConfirmationDialog/ConfirmationDialog";

import { useDialog } from "./useDialog";

export function useConfirmDialog() {
  const { openDialog } = useDialog();

  const confirmWithDialog = (props: ConfirmationDialogProps) => {
    openDialog(ConfirmationDialog, props);
  };

  return { confirmWithDialog };
}
