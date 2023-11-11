import { ReactElement, useState } from "react";
import { useMutation } from "react-query";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { useSnackbar } from "src/core/snackbar";

import { ProfileCreationPageComponent } from "./ProfileCreationPage.component";
import { ProfileCreatedDialog } from "./dialogs/ProfileCreated.dialog";

export interface ProfileCreationPageContainerProps {
  onProfileCreated?: () => void;
}

export function ProfileCreationPageContainer({
  onProfileCreated,
}: ProfileCreationPageContainerProps): ReactElement {
  const { t } = useTranslation("profile-creation");
  const { openDialog } = useDialog();

  const snackbar = useSnackbar();

  const mutation = useMutation(
    (createProfileCommand: CreateProfileCommand) =>
      profileApi.createCurrentProfile({ createProfileCommand }),
    {
      onError: () => snackbar.error(t("actions.create.error")),
    }
  );

  const [form, setForm] = useState<CreateProfileCommand>({
    dateOfBirth: new Date(),
    name: "",
    description: "",
  });

  async function handleSubmit(): Promise<void> {
    await mutation.mutateAsync(form);

    openDialog(ProfileCreatedDialog, {});

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
