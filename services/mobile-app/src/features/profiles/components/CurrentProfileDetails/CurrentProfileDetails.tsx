import { useRouter } from "expo-router";
import { View } from "react-native";

import { ProfileDetails, UpdateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "src/components/ui";
import { signOut } from "src/core/authentication";
import { required, useForm } from "src/core/forms";
import {
  CacheKeyEnum,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { pickImages } from "src/utils/photo";

interface ProfileEditForm {
  description: string;
  name: string;
}

interface CurrentProfileDetailsProps {
  profile: ProfileDetails;
}

export function CurrentProfileDetails({ profile }: CurrentProfileDetailsProps) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm<ProfileEditForm>(
    { description: profile.description, name: profile.name },
    {
      description: () => false,
      name: required(),
    },
  );

  const updateMutation = useMutation({
    mutationFn: (updateProfileCommand: UpdateProfileCommand) =>
      profileApi.updateCurrentProfile({ updateProfileCommand }),
  });

  const photoMutation = useMutation({
    mutationFn: (photo: Blob) =>
      profileApi.updateCurrentProfilePhoto({ photo }),
  });

  function handleSave(): void {
    const { data: values, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    updateMutation.mutate(values, {
      onError: () => snackbar.error("Failed to update profile"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.CurrentProfile],
        });
        snackbar.success("Profile updated");
      },
    });
  }

  async function handleChangePhoto(): Promise<void> {
    const [file] = await pickImages({ multiple: false });

    if (!file) {
      return;
    }

    photoMutation.mutate(file as unknown as Blob, {
      onError: () => snackbar.error("Failed to update photo"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.CurrentProfile],
        });
        snackbar.success("Photo updated");
      },
    });
  }

  function handleSignOut(): void {
    void signOut();
    router.replace("/login");
  }

  return (
    <>
      <View style={{ alignItems: "center", padding: 16 }}>
        <ProfileAvatar
          name={profile.name}
          size={96}
          src={profile.photo?.url}
        />
        <View style={{ height: 8 }} />
        <Typography variant="h5">{profile.name}</Typography>
        {profile.description ? (
          <Typography color="textSecondary" variant="body2">
            {profile.description}
          </Typography>
        ) : null}
        <View style={{ height: 8 }} />
        <Button onPress={handleChangePhoto} variant="text">
          Change photo
        </Button>
      </View>

      <View style={{ padding: 16 }}>
        <TextField
          error={form.state.name.error}
          label="Name"
          onValueChange={(value) => form.setValue({ name: value })}
          value={form.state.name.value}
        />
        <View style={{ height: 16 }} />
        <TextField
          error={form.state.description.error}
          label="Description"
          multiline
          onValueChange={(value) => form.setValue({ description: value })}
          value={form.state.description.value}
        />
        <View style={{ height: 16 }} />
        <Button
          color="primary"
          disabled={
            !form.state.name.value || updateMutation.isPending || photoMutation.isPending
          }
          onPress={handleSave}
          variant="contained"
        >
          Save
        </Button>
      </View>

      <List>
        <ListItem onPress={() => router.push("/profile/appearance")}>
          <ListItemText primary="Appearance" />
        </ListItem>
        <ListItem onPress={() => router.push("/profile/journal")}>
          <ListItemText primary="Journal" />
        </ListItem>
        <ListItem onPress={() => router.push("/profile/settings")}>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem onPress={handleSignOut}>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </>
  );
}