import { ReactNode } from "react";
import { View } from "react-native";

import { useTheme } from "src/core/theme";

interface CardProps {
  children?: ReactNode;
}

export function Card({ children }: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}
