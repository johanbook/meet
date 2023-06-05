import React from "react";

import { Button, TextField, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { VerticalCenter } from "src/components/ui/VerticalCenter";

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
  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          Enter your name
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>
        Pick the name you want to be known as on the platform. This{" "}
        <b>cannot</b> be changed later on.
      </Typography>

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
          Continue
        </Button>
      </Center>
    </VerticalCenter>
  );
}
