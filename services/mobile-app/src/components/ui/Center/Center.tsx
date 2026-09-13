import { ReactNode } from "react";
import { View } from "react-native";

interface CenterProps {
  children?: ReactNode;
  style?: Record<string, unknown>;
}

export function Center({ children, style }: CenterProps) {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        ...(style ?? {}),
      }}
    >
      {children}
    </View>
  );
}
