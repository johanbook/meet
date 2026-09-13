import { Pressable } from "react-native";

import { Icon, IconColor, IconName } from "../Icon/Icon";

interface IconButtonProps {
  accessibilityLabel?: string;
  disabled?: boolean;
  icon: IconName;
  iconColor?: IconColor;
  onPress?: () => void;
  size?: "default" | "small";
}

const SIZE_VALUE = {
  default: 40,
  small: 32,
} as const;

export function IconButton({
  accessibilityLabel,
  disabled = false,
  icon,
  iconColor,
  onPress,
  size = "default",
}: IconButtonProps) {
  const iconSize = size === "small" ? 20 : 24;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel || `${icon} button`}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        height: SIZE_VALUE[size],
        justifyContent: "center",
        opacity: pressed && !disabled ? 0.6 : 1,
        width: SIZE_VALUE[size],
      })}
    >
      <Icon color={iconColor} name={icon} size={iconSize} />
    </Pressable>
  );
}
