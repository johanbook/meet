import { Pressable, View } from "react-native";

import { useTheme } from "src/core/theme";

interface SwitchProps {
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

export function Switch({
  disabled = false,
  onValueChange,
  value,
}: SwitchProps) {
  const theme = useTheme();
  const trackColor = value ? theme.palette.primary : theme.palette.divider;
  const thumbColor = value ? "#ffffff" : theme.palette.text.secondary;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: trackColor,
        borderRadius: 16,
        height: 32,
        justifyContent: "center",
        opacity: pressed ? 0.7 : 1,
        width: 52,
      })}
    >
      <View
        style={{
          backgroundColor: thumbColor,
          borderRadius: 12,
          height: 24,
          marginLeft: value ? 22 : 6,
          width: 24,
        }}
      />
    </Pressable>
  );
}
