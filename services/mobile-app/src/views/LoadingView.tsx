import { ActivityIndicator, Text, View } from "react-native";

import { useTheme } from "src/core/theme";

export function LoadingView() {
  const theme = useTheme();

  return (
    <View
      accessibilityLabel="Loading"
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: theme.palette.primary, fontSize: 48 }}>
        {"\u2665"}
      </Text>
      <ActivityIndicator color={theme.palette.primary} size="large" />
    </View>
  );
}