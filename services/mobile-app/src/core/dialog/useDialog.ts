import { ReactNode, useContext } from "react";

import { GlobalDialogContext, GlobalDialogProps } from "./dialog.context";

export function useDialog(): {
  closeDialog: () => void;
  openDialog<T extends GlobalDialogProps>(
    element: (props: T) => ReactNode,
    props: Omit<T, keyof GlobalDialogProps>,
  ): void;
} {
  const context = useContext(GlobalDialogContext);

  return {
    closeDialog: context.closeDialog,
    openDialog: context.openDialog,
  };
}
