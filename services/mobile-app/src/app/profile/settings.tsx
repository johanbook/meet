import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { profileApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import {
  Button,
  ConfirmationDialogProps,
  Typography,
  useConfirmDialog,
} from "src/components/ui";
import { clearSession } from "src/core/authentication";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export default function SettingsPage() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { confirmWithDialog } = useConfirmDialog();

  const deleteMutation = useMutation({
    mutationFn: () => profileApi.deleteCurrentProfile(),
  });

  function handleDelete(): void {
    // The shared useConfirmDialog types its argument with the full
    // ConfirmationDialogProps (incl. provider-injected fields); the dialog
    // provider fills those in, so only the caller-facing fields are passed.
    const props = {
      description:
        "This will permanently delete your account and all your data.",
      onConfirm: (onSuccess: () => void) => {
        deleteMutation.mutate(undefined, {
          onError: () => snackbar.error("Failed to delete account"),
          onSuccess: () => {
            clearSession();
            onSuccess();
            snackbar.info("Account deleted");
            router.replace("/login");
          },
        });
      },
      title: "Delete account?",
    };

    confirmWithDialog(props as ConfirmationDialogProps);
  }

  return (
    <Screen navBackTo="/profile" title="Settings">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Typography color="textSecondary" variant="body2">
            Push notifications are handled by the web app.
          </Typography>
          <View style={{ height: 16 }} />
          <Button color="error" onPress={handleDelete} variant="contained">
            Delete account
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
