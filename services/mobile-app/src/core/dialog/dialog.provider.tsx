import { ReactNode, useState } from "react";
import { Modal, View } from "react-native";

import { GlobalDialogContext, GlobalDialogProps } from "./dialog.context";

interface ActiveDialog {
  props: GlobalDialogProps & Record<string, unknown>;
  render: (props: GlobalDialogProps & Record<string, unknown>) => ReactNode;
}

interface GlobalDialogProviderProps {
  children: ReactNode;
}

export function GlobalDialogProvider({ children }: GlobalDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<ActiveDialog | undefined>(undefined);

  function closeDialog(): void {
    setIsOpen(false);
  }

  function handleClosed(): void {
    setActive(undefined);
  }

  function openDialog<T extends GlobalDialogProps>(
    element: (props: T) => ReactNode,
    props: Omit<T, keyof GlobalDialogProps>,
  ): void {
    const dialogProps: GlobalDialogProps & Record<string, unknown> = {
      ...(props as Record<string, unknown>),
      closeDialog,
      isOpen: true,
      onClosed: handleClosed,
    };

    setActive({
      props: dialogProps,
      render: (activeProps) => element(activeProps as unknown as T),
    });
    setIsOpen(true);
  }

  const context = {
    closeDialog,
    isOpen,
    onClosed: handleClosed,
    openDialog,
  };

  return (
    <GlobalDialogContext.Provider value={context}>
      {children}
      {isOpen && active && (
        <Modal visible transparent={false} onRequestClose={closeDialog}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              padding: 32,
            }}
          >
            {active.render(active.props)}
          </View>
        </Modal>
      )}
    </GlobalDialogContext.Provider>
  );
}
