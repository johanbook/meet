import { ReactNode } from "react";
import { Text } from "react-native";

import { useTheme } from "src/core/theme";

type TypographyVariant = "body1" | "body2" | "caption" | "h4" | "h5" | "h6";

type TypographyColor = "error" | "primary" | "textPrimary" | "textSecondary";

const VARIANT_STYLE: Record<
  TypographyVariant,
  {
    fontSize: number;
    fontWeight?: "400" | "500" | "600" | "700";
    lineHeight: number;
  }
> = {
  body1: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
  h4: { fontSize: 34, fontWeight: "400", lineHeight: 40 },
  h5: { fontSize: 24, fontWeight: "400", lineHeight: 32 },
  h6: { fontSize: 20, fontWeight: "500", lineHeight: 24 },
};

interface TypographyProps {
  children?: ReactNode;
  color?: TypographyColor;
  numberOfLines?: number;
  variant?: TypographyVariant;
}

export function Typography({
  children,
  color = "textPrimary",
  numberOfLines,
  variant = "body1",
}: TypographyProps) {
  const theme = useTheme();

  const colorValue =
    color === "error"
      ? theme.palette.error
      : color === "primary"
        ? theme.palette.primary
        : color === "textSecondary"
          ? theme.palette.text.secondary
          : theme.palette.text.primary;

  return (
    <Text
      style={{
        color: colorValue,
        ...VARIANT_STYLE[variant],
      }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
