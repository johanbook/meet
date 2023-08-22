import React from "react";

import { Button, TextField, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { VerticalCenter } from "src/components/ui/VerticalCenter";
import { useTranslation } from "src/core/i18n";

export interface DescriptionFormProps {
  onChange: (value: string) => void;
  onNext: () => void;
  value: string;
}

export function DescriptionForm({
  onChange,
  onNext,
  value,
}: DescriptionFormProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");

  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          {t("description.header")}
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>
        {t("description.description")}
      </Typography>

      <TextField
        fullWidth
        multiline
        name="description"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Perhaps something about yourself"
        rows={4}
        sx={{ paddingBottom: 2 }}
        value={value}
      />

      <Center>
        <Button disabled={!value} onClick={onNext} variant="contained">
          {t("description.continue")}
        </Button>
      </Center>
    </VerticalCenter>
  );
}
