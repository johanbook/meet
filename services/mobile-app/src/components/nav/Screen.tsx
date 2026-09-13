import { ReactNode } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { OrganizationAvatar } from "src/components/shared/OrganizationAvatar/OrganizationAvatar";
import { IconButton } from "src/components/ui/IconButton/IconButton";
import { Typography } from "src/components/ui/Typography/Typography";
import { useTheme } from "src/core/theme";

interface ScreenProps {
  children: ReactNode;
  fab?: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  navBackTo?: string;
  title?: string;
}

/**
 * Standard page scaffold: sticky top bar (back / organization avatar, title,
 * right slot) above page content. Rendered inside the authenticated app shell
 * which overlays the bottom navigation.
 */
export function Screen({
  children,
  fab,
  headerLeft,
  headerRight,
  navBackTo,
  title,
}: ScreenProps) {
  const router = useRouter();
  const theme = useTheme();

  const left =
    headerLeft ??
    (navBackTo ? (
      <IconButton icon="arrowBack" onPress={() => router.replace(navBackTo)} />
    ) : (
      <OrganizationAvatar size={32} />
    ));

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          borderBottomColor: theme.palette.divider,
          borderBottomWidth: 1,
          flexDirection: "row",
          minHeight: 48,
          paddingHorizontal: 8,
        }}
      >
        {left}
        <View style={{ flex: 1 }}>
          {title ? (
            <Typography numberOfLines={1} variant="h6">
              {title}
            </Typography>
          ) : null}
        </View>
        {headerRight ?? null}
      </View>
      <View style={{ flex: 1 }}>{children}</View>
      {fab ?? null}
    </View>
  );
}
