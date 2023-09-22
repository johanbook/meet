import { FC, ReactElement, ReactNode, useState } from "react";

import {
  GlobalDialogContext,
  GlobalDialogProps,
  IGlobalDialogContext,
} from "./dialog.context";

type Dialog = FC<GlobalDialogProps>;

interface GlobalDialogProviderProps {
  children: ReactNode;
}

export function GlobalDialogProvider({
  children,
}: GlobalDialogProviderProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<{ component: Dialog | undefined }>({
    component: undefined,
  });
  const closeDialog = () => setIsOpen(false);

  const contextValue: IGlobalDialogContext = {
    openDialog: (Element, props) => {
      const GlobalDialogWrapper: Dialog = (state) => (
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        <Element {...state} {...props} />
      );

      setDialog({ component: GlobalDialogWrapper });
      setIsOpen(true);
    },
    isOpen,
    closeDialog,
    onClosed: () => setDialog({ component: undefined }),
  };

  const content =
    dialog.component &&
    dialog.component({
      closeDialog,
      isOpen,
    });

  return (
    <GlobalDialogContext.Provider value={contextValue}>
      {content}
      {children}
    </GlobalDialogContext.Provider>
  );
}
