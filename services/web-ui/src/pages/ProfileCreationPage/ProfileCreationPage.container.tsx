import React from "react";
import { useMutation } from "react-query";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useSnackbar } from "src/core/snackbar";

import { ProfileCreationPageComponent } from "./ProfileCreationPage.component";

export interface ProfileCreationPageContainerProps {
  onProfileCreated?: () => void;
}

export function ProfileCreationPageContainer({
  onProfileCreated,
}: ProfileCreationPageContainerProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");

  const snackbar = useSnackbar();

  const mutation = useMutation(
    (createProfileCommand: CreateProfileCommand) =>
      profileApi.createCurrentProfile({ createProfileCommand }),
    {
      onError: () => snackbar.error(t("actions.create.error")),
      onSuccess: () => snackbar.success(t("actions.create.success")),
    }
  );

  const [form, setForm] = React.useState<CreateProfileCommand>({
    dateOfBirth: new Date(),
    name: "",
    description: "",
  });

  async function handleSubmit(): Promise<void> {
    await mutation.mutateAsync(form as CreateProfileCommand);

    if (onProfileCreated) {
      onProfileCreated();
    }
  }

  return (
    <ProfileCreationPageComponent
      form={form}
      onCreateProfile={handleSubmit}
      setForm={setForm}
    />
  );
}
