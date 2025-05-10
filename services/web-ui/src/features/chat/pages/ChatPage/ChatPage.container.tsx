import { ReactElement } from "react";
import { useParams } from "react-router";

import { Box, Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { NotificationEventsConstants } from "src/core/notifications";
import { useHandleNotification } from "src/core/notifications";
import { CacheKeysConstants, useQuery, useQueryClient } from "src/core/query";
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
    queryFn: () => chatsApi.getChatMessages({ conversationId: id }),
  });

  const queryClient = useQueryClient();

  function handleRefresh(): void {
    refetch();
    queryClient.invalidateQueries({
      queryKey: [CacheKeysConstants.Chats],
    });
  }

  useHandleNotification({
    onCondition: (event: any) => String(event.data.senderId) === id,
    onNotification: handleRefresh,
    type: NotificationEventsConstants.NewChatMessage,
  });

  if (!id) {
    return (
      <ChatPageNav>
        <ErrorMessage message="Unable to find profile" />
      </ChatPageNav>
    );
  }

  if (error) {
    return (
      <ChatPageNav>
        <ErrorView />
      </ChatPageNav>
    );
  }

  if (isLoading) {
    return (
      <ChatPageNav>
        <Box sx={{ flexGrow: 1 }}>
          <ChatPageSkeleton />
        </Box>

        <ChatTextField conversationId={id} onSentMessage={handleRefresh} />
      </ChatPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChatPageNav>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="textSecondary">{t("no-messages")}</Typography>
        </Box>

        <ChatTextField conversationId={id} onSentMessage={handleRefresh} />
      </ChatPageNav>
    );
  }

  return (
    <ChatPageNav>
      <Box sx={{ flexGrow: 1 }}>
        <ChatMessageList messages={data} />
      </Box>

      <ChatTextField conversationId={id} onSentMessage={handleRefresh} />
    </ChatPageNav>
  );
}
