import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { View } from "react-native";

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

  return (
    <View style={{ backgroundColor: theme.palette.background.main, flex: 1 }}>
      {children}
      <BottomNav />
    </View>
  );
}

export default function AppLayout() {
  return (
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
  );
}
