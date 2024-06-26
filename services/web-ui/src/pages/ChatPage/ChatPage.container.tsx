import { ReactElement } from "react";
import { useParams } from "react-router";

import { Box, Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { NotificationEventsConstants } from "src/core/notifications";
import { useHandleNotification } from "src/core/notifications";
import { useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ChatPageNav } from "./ChatPage.nav";
import { ChatPageSkeleton } from "./ChatPage.skeleton";
import { ChatMessageList } from "./components/ChatMessageList";
import { ChatTextField } from "./components/ChatTextField";

export function ChatPageContainer(): ReactElement {
  const { id = "" } = useParams();
  const { t } = useTranslation("chat");

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => chatsApi.getChats({ conversationId: id }),
  });

  useHandleNotification({
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    onCondition: (event: any) => String(event.data.senderId) === id,
    onNotification: () => refetch(),
    type: NotificationEventsConstants.NewChatMessage,
  });

  if (!id) {
    return (
      <ChatPageNav>
        <ErrorMessage message="Unable to find profile" />
      </ChatPageNav>
    );
  }

  const receiverProfileId = Number.parseInt(id);

  if (error) {
    return (
      <ChatPageNav>
        <ErrorView error={error} />
      </ChatPageNav>
    );
  }

  if (isLoading) {
    return (
      <ChatPageNav>
        <ChatPageSkeleton />
      </ChatPageNav>
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
        <ChatPageNav>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color="textSecondary">{t("no-messages")}</Typography>
          </Box>

          <ChatTextField
            onSentMessage={refetch}
            receiverProfileId={receiverProfileId}
          />
        </ChatPageNav>
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
      <ChatPageNav>
        <Box sx={{ flexGrow: 1 }}>
          <ChatMessageList messages={data} />
        </Box>

        <ChatTextField
          onSentMessage={refetch}
          receiverProfileId={receiverProfileId}
        />
      </ChatPageNav>
    </Box>
  );
}
