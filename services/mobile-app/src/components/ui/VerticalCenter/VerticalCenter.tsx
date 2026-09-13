import { ReactNode } from "react";
import { View } from "react-native";

interface VerticalCenterProps {
  children?: ReactNode;
  style?: Record<string, unknown>;
}

export function VerticalCenter({ children, style }: VerticalCenterProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        ...(style ?? {}),
      }}
    >
      {children}
    </View>
  );
}