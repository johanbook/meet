import { usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ICON_GLYPHS, IconName } from "src/components/ui/Icon/Icon";
import { useTheme } from "src/core/theme";

import { useNavItems } from "./hooks/useNavItems";
import { NavItem } from "./nav.items";

const NAV_ICON: Record<string, IconName | undefined> = {
  "/": "dashboard",
  "/blog/create": "add",
  "/bookings": "calendarMonth",
  "/chat": "chat",
  "/time-series": "barChart",
  "/profile": "heart",
};

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const { navItems } = useNavItems();

  if (pathname.startsWith("/login") || pathname.startsWith("/verify-email")) {
    return null;
  }

  function isActive(item: NavItem): boolean {
    if (item.path === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(item.path);
  }

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        borderTopColor: theme.palette.divider,
        borderTopWidth: 1,
        flexDirection: "row",
        minHeight: 56,
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item);
        const icon = NAV_ICON[item.path];

        return (
          <Pressable
            accessibilityLabel={item.label}
            accessibilityRole="button"
            key={item.path}
            onPress={() => router.push(item.path)}
            style={({ pressed }) => ({
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text
              style={{
                color: active ? theme.palette.primary : theme.palette.text.secondary,
                fontSize: 20,
              }}
            >
              {icon ? ICON_GLYPHS[icon] : "\u2630"}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: active ? theme.palette.primary : theme.palette.text.secondary,
                fontSize: 10,
                marginTop: 2,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}