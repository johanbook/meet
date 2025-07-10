import { ReactElement, useState } from "react";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { getDateYearsAgo } from "src/utils/time";

import { ProfileCreationPageComponent } from "./ProfileCreationPage.component";

export interface ProfileCreationPageContainerProps {
  onProfileCreated?: () => void;
}

export function ProfileCreationPageContainer({
  onProfileCreated,
}: ProfileCreationPageContainerProps): ReactElement {
  const { t } = useTranslation("profile.creation");

  const snackbar = useSnackbar();

  const mutation = useMutation({
    mutationFn: (createProfileCommand: CreateProfileCommand) =>
      profileApi.createCurrentProfile({ createProfileCommand }),
    onError: () => snackbar.error(t("actions.create.error")),
    onSuccess: () => snackbar.success(t("actions.create.success")),
  });

  const [form, setForm] = useState<CreateProfileCommand>({
    dateOfBirth: getDateYearsAgo(14),
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
