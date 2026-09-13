import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

import { useTheme } from "src/core/theme";

type ButtonColor = "default" | "error" | "primary";

type ButtonVariant = "contained" | "outlined" | "text";

interface ButtonProps {
  children: ReactNode;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  onPress?: PressableProps["onPress"];
  variant?: ButtonVariant;
}

const COLOR_VALUE: Record<ButtonColor, (primary: string, error: string) => string> = {
  default: () => "#1976d2",
  error: (_, error) => error,
  primary: (primary) => primary,
};

export function Button({
  children,
  color = "default",
  disabled = false,
  loading = false,
  onPress,
  variant = "contained",
}: ButtonProps) {
  const theme = useTheme();
  const colorValue = COLOR_VALUE[color](theme.palette.primary, theme.palette.error);
  const isDisabled = disabled || loading;

  const backgroundColor =
    variant === "contained" && !isDisabled ? colorValue : "transparent";
  const borderColor =
    variant === "outlined" && !isDisabled ? colorValue : "transparent";
  const labelColor = isDisabled
    ? theme.palette.text.secondary
    : variant === "contained"
      ? "#ffffff"
      : colorValue;
  const pressedOpacity = disabled || loading ? 1 : 0.6;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignItems: "center",
          backgroundColor,
          borderColor,
          borderRadius: 4,
          borderWidth: variant === "outlined" ? 1 : 0,
          justifyContent: "center",
          minHeight: 40,
          opacity: pressed ? pressedOpacity : 1,
          paddingHorizontal: 16,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={labelColor} size="small" />
      ) : (
        <Text style={{ color: labelColor, fontSize: 14, fontWeight: "500" }}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}