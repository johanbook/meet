import { Image } from "expo-image";
import { View } from "react-native";

import { useTheme } from "src/core/theme";

interface PhotoProps {
  source: {
    uri: string | undefined;
  };
}

/** Renders an image from a URL or a picked local file descriptor. */
export function Photo({ source }: PhotoProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.darkmode ? "#303030" : "#f5f5f5",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Image
        source={{ uri: source.uri }}
        style={{ aspectRatio: 1, width: "100%" }}
      />
    </View>
  );
}