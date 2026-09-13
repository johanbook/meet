import { Pressable, Text, View } from "react-native";

import { useTheme } from "src/core/theme";

import { Icon, IconName } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";

interface EmptyStateProps {
  message: string;
  onAction?: () => void;
  actionIcon?: IconName;
  actionLabel?: string;
}

export function EmptyState({
  message,
  onAction,
  actionIcon = "add",
  actionLabel,
}: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: 32,
      }}
    >
      <Typography color="textSecondary" variant="body2">
        {message}
      </Typography>
      {onAction && actionLabel ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={({ pressed }) => ({
            borderColor: theme.palette.primary,
            borderRadius: 4,
            borderWidth: 1,
            flexDirection: "row",
            marginTop: 16,
            opacity: pressed ? 0.7 : 1,
            paddingHorizontal: 16,
            paddingVertical: 8,
          })}
        >
          <Icon color="primary" name={actionIcon} size={20} />
          <Text style={{ color: theme.palette.primary, fontSize: 14 }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
