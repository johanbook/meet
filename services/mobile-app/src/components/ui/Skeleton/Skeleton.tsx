import { View } from "react-native";

import { useTheme } from "src/core/theme";

interface SkeletonProps {
  borderRadius?: number;
  height: number;
  width?: number | `${number}%`;
}

export function Skeleton({
  borderRadius = 4,
  height,
  width = "100%",
}: SkeletonProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.darkmode ? "#303030" : "#e0e0e0",
        borderRadius,
        height,
        width,
      }}
    />
  );
}
