import { useDialog } from "src/core/dialog";

import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from "./ConfirmationDialog";

type ConfirmDialogCallerProps = Omit<
  ConfirmationDialogProps,
  "closeDialog" | "isOpen" | "onClosed"
>;

export function useConfirmDialog() {
  const { openDialog } = useDialog();

  function confirmWithDialog(props: ConfirmDialogCallerProps): void {
    openDialog<ConfirmationDialogProps>(ConfirmationDialog, props);
  }

  return { confirmWithDialog };
}
