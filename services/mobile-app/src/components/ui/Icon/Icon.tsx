import { Text } from "react-native";

import { useTheme } from "src/core/theme";

// Icon glyphs from the Unicode BMP (no emoji fonts required).
export const ICON_GLYPHS = {
  add: "+",
  arrowBack: "\u2039",
  barChart: "\u25a5",
  calendarMonth: "\u25a6",
  chat: "\u2709",
  close: "\u2715",
  comment: "\u270e",
  dashboard: "\u2630",
  heart: "\u2665",
  heartBorder: "\u2661",
  more: "\u22ef",
  send: "\u27a4",
  viewDay: "\u25eb",
} as const;

export type IconName = keyof typeof ICON_GLYPHS;

export type IconColor = "default" | "error" | "primary";

interface IconProps {
  color?: IconColor;
  name: IconName;
  size?: number;
}

const COLOR_VALUE: Record<
  IconColor,
  (primary: string, error: string) => string
> = {
  default: () => "#000000",
  error: (_, error) => error,
  primary: (primary) => primary,
};

export function Icon({ color = "default", name, size = 24 }: IconProps) {
  const theme = useTheme();
  const resolvedColor = COLOR_VALUE[color](
    theme.palette.primary,
    theme.palette.error,
  );

  return (
    <Text
      style={{
        color: resolvedColor,
        fontSize: size,
        lineHeight: size,
      }}
    >
      {ICON_GLYPHS[name]}
    </Text>
  );
}
