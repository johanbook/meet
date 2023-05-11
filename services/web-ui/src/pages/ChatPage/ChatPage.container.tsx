import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { List, Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { ChatMessage } from "src/components/ChatMessage";
import { ChatTextField } from "src/components/ChatTextField";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { NotificationEventsConstants } from "src/constants/notification-events.constants";
import { useHandleNotification } from "src/hooks/useHandleNotification";

import { ChatPageHeader } from "./ChatPage.header";
import { ChatPageSkeleton } from "./ChatPage.skeleton";

export function ChatPageContainer(): React.ReactElement {
  const { id } = useParams();

  const { error, data, isLoading, refetch } = useQuery(`chat-${id}`, () =>
    chatsApi.getChats({ profileId: id || "" })
  );

  useHandleNotification({
    onCondition: (event) => event.data.receiverId === id,
    onNotification: () => refetch(),
    type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
  });

  if (!id) {
    return (
      <>
        <ChatPageHeader /> <ErrorMessage message="Unable to find profile" />{" "}
      </>
    );
  }

  const receiverProfileId = Number.parseInt(id);

  if (error) {
    const message = (error as Error).message;
    return (
      <>
        <ChatPageHeader />
        <ErrorMessage message={message} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ChatPageHeader />
        <ChatPageSkeleton />
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <ChatPageHeader />

        <Typography gutterBottom variant="h6">
          No messages in chat
        </Typography>

        <Typography color="textSecondary">
          Send a message and say 'hi'!
        </Typography>

        <ChatTextField
          onSentMessage={refetch}
          receiverProfileId={receiverProfileId}
        />
      </>
    );
  }

  return (
    <>
      <ChatPageHeader />

      <List>
        {data.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </List>

      <ChatTextField
        onSentMessage={refetch}
        receiverProfileId={receiverProfileId}
      />
    </>
  );
}
