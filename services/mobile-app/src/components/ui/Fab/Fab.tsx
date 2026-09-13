import { Pressable, Text } from "react-native";

import { useTheme } from "src/core/theme";

import { ICON_GLYPHS, IconName } from "../Icon/Icon";

interface FabProps {
  icon?: IconName;
  onPress?: () => void;
}

export function Fab({ icon = "add", onPress }: FabProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel={`${icon} action`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: theme.palette.primary,
        borderRadius: 28,
        bottom: 8,
        elevation: 4,
        height: 56,
        justifyContent: "center",
        opacity: pressed ? 0.8 : 1,
        position: "absolute",
        right: 16,
        width: 56,
        zIndex: 100,
      })}
    >
      <Text style={{ color: "#ffffff", fontSize: 28, lineHeight: 28 }}>
        {ICON_GLYPHS[icon]}
      </Text>
    </Pressable>
  );
}