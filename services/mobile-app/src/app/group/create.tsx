import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { CreateOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { Button, TextField } from "src/components/ui";
import { required, useForm } from "src/core/forms";
import {
  CacheKeyEnum,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export default function CreateGroupPage() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm<CreateOrganizationCommand>(
    { name: "" },
    { name: required() },
  );

  const mutation = useMutation({
    mutationFn: (createOrganizationCommand: CreateOrganizationCommand) =>
      organizationsApi.createOrganization({ createOrganizationCommand }),
  });

  function handleSubmit(): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data, {
      onError: () => snackbar.error("Unable to create group"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.OrganizationList],
        });
        form.reset();
        snackbar.success("Group created");
        router.replace("/group/list");
      },
    });
  }

  return (
    <Screen navBackTo="/group/list" title="Create group">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <TextField
            error={form.state.name.error}
            label="Name"
            onValueChange={(value) => form.setValue({ name: value })}
            value={form.state.name.value}
          />
          <View style={{ height: 16 }} />
          <Button
            color="primary"
            disabled={!form.state.name.value || mutation.isPending}
            onPress={handleSubmit}
            variant="contained"
          >
            Create
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}