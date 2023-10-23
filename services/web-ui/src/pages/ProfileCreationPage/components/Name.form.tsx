import { ReactElement } from "react";

import { Button, TextField, Typography } from "src/components/ui";
import { Center } from "src/components/ui/Center";
import { VerticalCenter } from "src/components/ui/VerticalCenter";
import { useTranslation } from "src/core/i18n";

export interface NameFormProps {
  onChange: (value: string) => void;
  onNext: () => void;
  value: string;
}

export function NameForm({
  onChange,
  onNext,
  value,
}: NameFormProps): ReactElement {
  const { t } = useTranslation("profile-creation");

  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          {t("name.header")}
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>{t("name.description")}</Typography>

      <TextField
        fullWidth
        label={t("name.label")}
        name="name"
        onChange={(value) => onChange(value)}
        placeholder={t("name.placeholder") || ""}
        sx={{ paddingBottom: 2 }}
        value={value}
      />

      <Center>
        <Button disabled={!value} onClick={onNext} variant="contained">
          {t("name.continue")}
        </Button>
      </Center>
    </VerticalCenter>
  );
}
