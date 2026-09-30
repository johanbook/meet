import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { BottomNav } from "src/components/nav/BottomNav";
import { AuthenticationGuard } from "src/core/authentication";
import { GlobalDialogProvider } from "src/core/dialog";
import { NotificationProvider } from "src/core/notifications";
import { ProfileGuard } from "src/core/profiles";
import { SnackbarProvider } from "src/core/snackbar";
import { ThemeProvider, useTheme } from "src/core/theme";
import { QUERY_CLIENT } from "src/queryQlient";

interface ShellProps {
  children: ReactNode;
}

function Shell({ children }: ShellProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    // The insets keep the header and bottom navigation clear of the device
    // status bar / notch / home indicator; the app background paints the
    // safe zones so nothing looks truncated.
    <View
      style={{
        backgroundColor: theme.palette.background.main,
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      {children}
      <BottomNav />
    </View>
  );
}

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ThemeProvider>
          <SnackbarProvider>
            <GlobalDialogProvider>
              <AuthenticationGuard>
                <NotificationProvider>
                  <ProfileGuard>
                    <Shell>
                      <Slot />
                    </Shell>
                  </ProfileGuard>
                </NotificationProvider>
              </AuthenticationGuard>
            </GlobalDialogProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
