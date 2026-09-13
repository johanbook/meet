import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { profileApi } from "src/apis";
import { CreateProfileCommand } from "src/api";
import { useForm, required } from "src/core/forms";
import { CacheKeyEnum } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { Button } from "src/components/ui/Button/Button";
import { Center } from "src/components/ui/Center/Center";
import { TextField } from "src/components/ui/TextField/TextField";
import { Typography } from "src/components/ui/Typography/Typography";

interface ProfileFormValues {
  dateOfBirth: string;
  description: string;
  name: string;
}

interface ProfileCreationPageProps {
  onProfileCreated: () => void;
}

export function ProfileCreationPage({
  onProfileCreated,
}: ProfileCreationPageProps) {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormValues>(
    {
      dateOfBirth: "",
      description: "",
      name: "",
    },
    {
      dateOfBirth: required<ProfileFormValues>(),
      description: required<ProfileFormValues>(),
      name: required<ProfileFormValues>(),
    },
  );

  const mutation = useMutation({
    mutationFn: (command: CreateProfileCommand) =>
      profileApi.createCurrentProfile({ createProfileCommand: command }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeyEnum.CurrentProfile],
      });
      form.reset();
      onProfileCreated();
    },
    onError: () => {
      snackbar.error(
        "Something went wrong when trying to create your profile",
      );
    },
  });

  function handleSubmit(): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    const dateOfBirth = dayjs(data.dateOfBirth, "YYYY-MM-DD");

    if (!dateOfBirth.isValid()) {
      snackbar.error("Enter your date of birth as YYYY-MM-DD");

      return;
    }

    mutation.mutate({
      dateOfBirth: dateOfBirth.toDate(),
      description: data.description,
      name: data.name,
    });
  }

  return (
    <Center style={{ padding: 24 }}>
      <Typography variant="h5">Create your profile</Typography>
      <Typography color="textSecondary" variant="body2">
        To use meet you need a profile so others can find you.
      </Typography>
      <TextField
        label="Name"
        onValueChange={(value) => form.setValue({ name: value })}
        value={form.state.name.value}
      />
      <TextField
        label="Date of birth (YYYY-MM-DD)"
        onValueChange={(value) => form.setValue({ dateOfBirth: value })}
        value={form.state.dateOfBirth.value}
      />
      <TextField
        label="Description"
        multiline
        onValueChange={(value) => form.setValue({ description: value })}
        value={form.state.description.value}
      />
      <Button
        color="primary"
        disabled={mutation.isPending}
        loading={mutation.isPending}
        onPress={handleSubmit}
        variant="contained"
      >
        Create profile
      </Button>
    </Center>
  );
}