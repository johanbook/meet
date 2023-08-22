import React from "react";

import { Button, TextField, Typography } from "@mui/material";

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
}: NameFormProps): React.ReactElement {
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
        name="name"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Name"
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
