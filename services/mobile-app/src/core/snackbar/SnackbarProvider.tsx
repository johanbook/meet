import { ReactNode, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Theme, useTheme } from "src/core/theme";

import {
  SnackbarContext,
  SnackbarMessage,
  SnackbarVariant,
  snackbarContext,
} from "./snackbar";

const AUTO_HIDE_MS = 3000;

const VARIANT_COLOR: Record<
  SnackbarVariant,
  (palette: Theme["palette"]) => string
> = {
  error: (palette) => palette.error,
  info: (palette) => palette.primary,
  success: (palette) => palette.success,
  warning: (palette) => palette.warning,
};

let nextSnackbarId = 0;

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const theme = useTheme();
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  function dismiss(id: number): void {
    const timer = timers.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }

    setMessages((current) => current.filter((message) => message.id !== id));
  }

  function show(message: string, variant: SnackbarVariant): void {
    const id = nextSnackbarId++;
    setMessages((current) => [...current, { id, message, variant }]);

    timers.current.set(
      id,
      setTimeout(() => dismiss(id), AUTO_HIDE_MS),
    );
  }

  const context: SnackbarContext = {
    error: (message) => show(message, "error"),
    info: (message) => show(message, "info"),
    success: (message) => show(message, "success"),
    warn: (message) => show(message, "warning"),
  };

  return (
    <snackbarContext.Provider value={context}>
      {children}
      {messages.map((message) => (
        <View
          key={message.id}
          style={[
            styles.snackbar,
            { backgroundColor: VARIANT_COLOR[message.variant](theme.palette) },
          ]}
        >
          <Text style={styles.text}>{message.message}</Text>
        </View>
      ))}
    </snackbarContext.Provider>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 4,
    bottom: 96,
    elevation: 6,
    zIndex: 1000,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
