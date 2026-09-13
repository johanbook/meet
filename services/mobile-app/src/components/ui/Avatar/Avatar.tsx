import { Image } from "expo-image";
import { Text, View } from "react-native";

import { useTheme } from "src/core/theme";

interface AvatarProps {
  name?: string;
  size?: number;
  src?: string;
}

function initialsOf(name: string | undefined): string {
  if (!name) {
    return "";
  }

  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (parts.length === 0) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({ name, size = 40, src }: AvatarProps) {
  const theme = useTheme();

  if (src) {
    return (
      <Image
        source={{ uri: src }}
        style={{ borderRadius: size / 2, height: size, width: size }}
      />
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.palette.primary,
        borderRadius: size / 2,
        height: size,
        justifyContent: "center",
        width: size,
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: size * 0.45,
          fontWeight: "700",
        }}
      >
        {initialsOf(name)}
      </Text>
    </View>
  );
}
