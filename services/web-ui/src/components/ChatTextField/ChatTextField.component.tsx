import React from "react";

import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export interface ChatTextFieldComponentProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  value: string;
}

export function ChatTextFieldComponent({
  disabled,
  onChange,
  onSubmit,
  value,
}: ChatTextFieldComponentProps): React.ReactElement {
  const { t } = useTranslation("chat");

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form>
      <TextField
        disabled={disabled}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                color="primary"
                disabled={!value}
                onClick={handleSubmit}
                type="submit"
              >
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder={t("textfield.placeholder") || ""}
        onChange={(event) => onChange(event.target.value)}
        sx={{ paddingBottom: 2 }}
        value={value}
      />
    </form>
  );
}
