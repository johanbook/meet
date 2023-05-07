import React from "react";
import { useMutation } from "react-query";

import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { PostChatMessageCommand } from "src/api";
import { chatsApi } from "src/apis";
import { useSnackbar } from "src/hooks/useSnackbar";

export interface ChatTextFieldProps {
  onSentMessage: () => void;
  receiverProfileId: number;
}

export function ChatTextField({
  onSentMessage,
  receiverProfileId,
}: ChatTextFieldProps): React.ReactElement {
  const snackbar = useSnackbar();

  const mutation = useMutation(
    (postChatMessageCommand: PostChatMessageCommand) =>
      chatsApi.postChatMessage({ postChatMessageCommand }),
    { onError: () => snackbar.error("Unable to send message") }
  );
  const [value, setValue] = React.useState("");

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    const message = value;

    setValue("");

    await mutation.mutateAsync({ message, profileId: receiverProfileId });

    onSentMessage();
  }

  return (
    <form>
      <TextField
        disabled={mutation.isLoading}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton color="primary" onClick={handleSubmit} type="submit">
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="A chat message..."
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </form>
  );
}
