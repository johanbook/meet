import React from "react";
import { useMutation } from "react-query";

import { PostChatMessageCommand } from "src/api";
import { chatsApi } from "src/apis";
import { useSnackbar } from "src/core/snackbar";

import { ChatTextFieldComponent } from "./ChatTextField.component";

export interface ChatTextFieldContainerProps {
  onSentMessage: () => void;
  receiverProfileId: number;
}

export function ChatTextFieldContainer({
  onSentMessage,
  receiverProfileId,
}: ChatTextFieldContainerProps): React.ReactElement {
  const snackbar = useSnackbar();

  const mutation = useMutation(
    (postChatMessageCommand: PostChatMessageCommand) =>
      chatsApi.postChatMessage({ postChatMessageCommand }),
    { onError: () => snackbar.error("Unable to send message") }
  );
  const [value, setValue] = React.useState("");

  async function handleSubmit(): Promise<void> {
    const message = value;

    setValue("");

    await mutation.mutateAsync({ message, profileId: receiverProfileId });

    onSentMessage();
  }

  return (
    <ChatTextFieldComponent
      disabled={mutation.isLoading}
      onChange={setValue}
      onSubmit={handleSubmit}
      value={value}
    />
  );
}
