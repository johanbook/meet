import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { Box, Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { ChatMessageList } from "src/components/ChatMessageList";
import { ChatTextField } from "src/components/ChatTextField";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { NotificationEventsConstants } from "src/constants/notification-events.constants";
import { useHandleNotification } from "src/hooks/useHandleNotification";

import { ErrorPage } from "../ErrorPage";
import { ChatPageHeader } from "./ChatPage.header";
import { ChatPageSkeleton } from "./ChatPage.skeleton";

export function ChatPageContainer(): React.ReactElement {
  const { id } = useParams();

  const { error, data, isLoading, refetch } = useQuery(`chat-${id}`, () =>
    chatsApi.getChats({ profileId: id || "" })
  );

  useHandleNotification({
    onCondition: (event) => String(event.data.senderId) === id,
    onNotification: () => refetch(),
    type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
  });

  if (!id) {
    return (
      <>
        <ChatPageHeader />
        <ErrorMessage message="Unable to find profile" />
      </>
    );
  }

  const receiverProfileId = Number.parseInt(id);

  if (error) {
    return (
      <>
        <ChatPageHeader />
        <ErrorPage error={error} />
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <ChatPageHeader />

        <Box sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6">
            No messages in chat
          </Typography>

          <Typography color="textSecondary">
            Send a message and say 'hi'!
          </Typography>
        </Box>

        <ChatTextField
          onSentMessage={refetch}
          receiverProfileId={receiverProfileId}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <ChatPageHeader />

      <Box sx={{ flexGrow: 1 }}>
        <ChatMessageList messages={data} />
      </Box>

      <ChatTextField
        onSentMessage={refetch}
        receiverProfileId={receiverProfileId}
      />
    </Box>
  );
}
