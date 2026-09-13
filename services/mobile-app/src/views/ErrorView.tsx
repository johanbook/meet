import { Text } from "react-native";

import { Center } from "src/components/ui/Center/Center";
import { useTheme } from "src/core/theme";

interface ErrorViewProps {
  description?: string;
  message?: string;
}

export function ErrorView({
  description,
  message = "An unexpected error occurred",
}: ErrorViewProps) {
  const theme = useTheme();

  return (
    <Center style={{ padding: 48 }}>
      <Text style={{ color: theme.palette.error, fontSize: 60 }}>{"\u2665"}</Text>
      <Text style={{ color: theme.palette.text.primary, fontSize: 24, marginTop: 16 }}>
        {message}
      </Text>
      {description ? (
        <Text style={{ color: theme.palette.text.secondary, fontSize: 16, marginTop: 8 }}>
          {description}
        </Text>
      ) : null}
    </Center>
  );
}