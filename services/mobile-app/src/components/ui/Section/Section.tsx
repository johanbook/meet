import { ReactNode, useState } from "react";
import { Pressable, View } from "react-native";

import { useTheme } from "src/core/theme";

import { Typography } from "../Typography/Typography";

interface SectionProps {
  children?: ReactNode;
  openByDefault?: boolean;
  title: string;
}

/** Collapsible card (charts / data / settings on the time-series page). */
export function Section({ children, openByDefault = false, title }: SectionProps) {
  const [isOpen, setIsOpen] = useState(openByDefault);
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        borderRadius: 16,
        borderWidth: 1,
        overflow: "hidden",
      }}
    >
      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen(!isOpen)}
        style={({ pressed }) => ({
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          flexDirection: "row",
          opacity: pressed ? 0.7 : 1,
          padding: 16,
        })}
      >
        <Typography color="textSecondary" variant="h6">
          {title}
        </Typography>
      </Pressable>
      {isOpen ? <View style={{ padding: 16 }}>{children}</View> : null}
    </View>
  );
}