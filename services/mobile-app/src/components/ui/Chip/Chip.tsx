import { Text, View } from "react-native";

import { Theme, useTheme } from "src/core/theme";

type ChipColor = "default" | "info" | "primary" | "success" | "warning";

interface ChipProps {
  color?: ChipColor;
  label: string;
}

const CHIP_COLOR: Record<ChipColor, (palette: Theme["palette"]) => string> = {
  default: () => "#757575",
  info: (palette) => palette.info,
  primary: (palette) => palette.primary,
  success: (palette) => palette.success,
  warning: (palette) => palette.warning,
};

export function Chip({ color = "default", label }: ChipProps) {
  const theme = useTheme();
  const colorValue = CHIP_COLOR[color](theme.palette);

  return (
    <View
      style={{
        backgroundColor: "transparent",
        borderColor: colorValue,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <Text style={{ color: colorValue, fontSize: 12 }}>{label}</Text>
    </View>
  );
}