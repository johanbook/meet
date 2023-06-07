import React from "react";
import { useMutation } from "react-query";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { useSnackbar } from "src/hooks/useSnackbar";

import { ProfileCreationPageComponent } from "./ProfileCreationPage.component";

export interface ProfileCreationPageContainerProps {
  onProfileCreated?: () => void;
}

export function ProfileCreationPageContainer({
  onProfileCreated,
}: ProfileCreationPageContainerProps): React.ReactElement {
  const location = useCurrentLocation();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    (createProfileCommand: CreateProfileCommand) =>
      profileApi.createCurrentProfile({ createProfileCommand }),
    {
      onError: () => snackbar.error("Unable to create profile"),
      onSuccess: () =>
        snackbar.success("Your profile was successfully created!"),
    }
  );

  const [form, setForm] = React.useState<CreateProfileCommand>({
    dateOfBirth: new Date(),
    name: "",
    description: "",
    recentLocation: { lat: 0, lon: 0 },
  });

  async function handleSubmit(): Promise<void> {
    const coordinates = location.coordinates;

    const completedForm = form as CreateProfileCommand;
    const lat = coordinates?.latitude || 0;
    const lon = coordinates?.longitude || 0;

    await mutation.mutateAsync({
      ...completedForm,
      recentLocation: { lat, lon },
    });

    if (onProfileCreated) {
      onProfileCreated();
    }
  }

  if (location.error) {
    return <p>Please enable your location</p>;
  }

  return (
    <ProfileCreationPageComponent
      form={form}
      onCreateProfile={handleSubmit}
      setForm={setForm}
    />
  );
}
