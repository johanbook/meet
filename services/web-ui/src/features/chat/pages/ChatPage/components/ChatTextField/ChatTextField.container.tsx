import { ReactElement, useState } from "react";

import { PostChatMessageCommand } from "src/api";
import { chatsApi } from "src/apis";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { ChatTextFieldComponent } from "./ChatTextField.component";

interface ChatTextFieldContainerProps {
  conversationId: string;
  onSentMessage: () => void;
}

export function ChatTextFieldContainer({
  conversationId,
  onSentMessage,
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

    await mutation.mutateAsync({ chatConversationId: conversationId, message });

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
