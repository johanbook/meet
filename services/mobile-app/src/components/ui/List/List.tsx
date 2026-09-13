import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "src/core/theme";

export function List({ children }: { children?: ReactNode }) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        width: "100%",
      }}
    >
      {children}
    </View>
  );
}

interface ListItemProps {
  children?: ReactNode;
  onPress?: () => void;
}

export function ListItem({ children, onPress }: ListItemProps) {
  const theme = useTheme();

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => ({
          borderBottomColor: theme.palette.divider,
          borderBottomWidth: 1,
          opacity: pressed ? 0.6 : 1,
          paddingHorizontal: 16,
          paddingVertical: 12,
          width: "100%",
        })}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={{
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        width: "100%",
      }}
    >
      {children}
    </View>
  );
}

interface ListItemTextProps {
  primary: string;
  secondary?: string;
}

export function ListItemText({ primary, secondary }: ListItemTextProps) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, marginLeft: 8 }}>
      <Text style={{ color: theme.palette.text.primary, fontSize: 16 }}>
        {primary}
      </Text>
      {secondary ? (
        <Text
          numberOfLines={2}
          style={{
            color: theme.palette.text.secondary,
            fontSize: 14,
            marginTop: 2,
          }}
        >
          {secondary}
        </Text>
      ) : null}
    </View>
  );
}