import { ReactElement, useState } from "react";

import { PostChatMessageCommand } from "src/api";
import { chatsApi } from "src/apis";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { ChatTextFieldComponent } from "./ChatTextField.component";

export interface ChatTextFieldContainerProps {
  onSentMessage: () => void;
  receiverProfileId: number;
}

export function ChatTextFieldContainer({
  onSentMessage,
  receiverProfileId,
}: ChatTextFieldContainerProps): ReactElement {
  const snackbar = useSnackbar();

  const mutation = useMutation({
    mutationFn: (postChatMessageCommand: PostChatMessageCommand) =>
      chatsApi.postChatMessage({ postChatMessageCommand }),
    onError: () => snackbar.error("Unable to send message"),
  });

  const [value, setValue] = useState("");

  async function handleSubmit(): Promise<void> {
    const message = value;

    setValue("");

    await mutation.mutateAsync({ message, profileId: receiverProfileId });

    onSentMessage();
  }

  return (
    <ChatTextFieldComponent
      disabled={mutation.isPending}
      onChange={setValue}
      onSubmit={handleSubmit}
      value={value}
    />
  );
}
