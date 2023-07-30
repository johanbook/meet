import React from "react";

import { Button, TextField, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { VerticalCenter } from "src/components/ui/VerticalCenter";

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
  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          Add something about you
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>
        Write a short description about yourself. This will be shown to others.
      </Typography>

      <TextField
        fullWidth
        multiline
        name="description"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Perhaps something flirty?"
        rows={4}
        sx={{ paddingBottom: 2 }}
        value={value}
      />

      <Center>
        <Button disabled={!value} onClick={onNext} variant="contained">
          Finish
        </Button>
      </Center>
    </VerticalCenter>
  );
}
