import { useRouter } from "expo-router";
import { View } from "react-native";

import { CurrentOrganizationDetails, UpdateOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import {
  Button,
  ConfirmationDialogProps,
  TextField,
  Typography,
  useConfirmDialog,
} from "src/components/ui";
import { Permissions, useAuthorization } from "src/core/authorization";
import { required, useForm } from "src/core/forms";
import {
  CacheKeyEnum,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface GroupSettingsProps {
  data: CurrentOrganizationDetails;
}

export function GroupSettings({ data }: GroupSettingsProps) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const authorization = useAuthorization();
  const { confirmWithDialog } = useConfirmDialog();

  const form = useForm<UpdateOrganizationCommand>(
    { name: data.name },
    { name: required() },
  );

  const updateMutation = useMutation({
    mutationFn: (updateOrganizationCommand: UpdateOrganizationCommand) =>
      organizationsApi.updateCurrentOrganization({ updateOrganizationCommand }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => organizationsApi.deleteCurrentOrganization(),
  });

  const leaveMutation = useMutation({
    mutationFn: () => organizationsApi.leaveCurrentOrganization(),
  });

  const canEdit =
    authorization.hasPermission?.(Permissions.Organization.Edit) === true;
  const canLeave =
    authorization.hasPermission?.(Permissions.Organization.Leave) === true;

  function handleSave(): void {
    const { data: values, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    updateMutation.mutate(values, {
      onError: () => snackbar.error("Failed to update group"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.CurrentOrganization],
        });
        snackbar.success("Group updated");
      },
    });
  }

  function handleDelete(): void {
    // The shared useConfirmDialog types its argument with the full
    // ConfirmationDialogProps (incl. provider-injected fields); the dialog
    // provider fills those in, so only the caller-facing fields are passed.
    const props = {
      description: "This will permanently delete the group.",
      onConfirm: (onSuccess: () => void) => {
        deleteMutation.mutate(undefined, {
          onError: () => snackbar.error("Failed to delete group"),
          onSuccess: () => {
            onSuccess();
            snackbar.success("Group deleted");
            router.replace("/group/list");
          },
        });
      },
      title: "Delete group?",
    };

    confirmWithDialog(props as ConfirmationDialogProps);
  }

  function handleLeave(): void {
    const props = {
      description: "This will remove you from the group.",
      onConfirm: (onSuccess: () => void) => {
        leaveMutation.mutate(undefined, {
          onError: () => snackbar.error("Failed to leave group"),
          onSuccess: () => {
            onSuccess();
            snackbar.success("You left the group");
            router.replace("/group/list");
          },
        });
      },
      title: "Leave group?",
    };

    confirmWithDialog(props as ConfirmationDialogProps);
  }

  if (canEdit) {
    return (
      <View style={{ padding: 16 }}>
        <Typography color="textSecondary" variant="h6">
          Settings
        </Typography>
        <View style={{ height: 8 }} />
        <TextField
          error={form.state.name.error}
          label="Name"
          onValueChange={(value) => form.setValue({ name: value })}
          value={form.state.name.value}
        />
        <View style={{ height: 16 }} />
        <Button
          color="primary"
          disabled={!form.state.name.value || updateMutation.isPending}
          onPress={handleSave}
          variant="contained"
        >
          Save
        </Button>
        <View style={{ height: 16 }} />
        <Button color="error" onPress={handleDelete} variant="contained">
          Delete group
        </Button>
      </View>
    );
  }

  if (canLeave) {
    return (
      <View style={{ padding: 16 }}>
        <Button color="error" onPress={handleLeave} variant="contained">
          Leave group
        </Button>
      </View>
    );
  }

  return null;
}