import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ChatListPageComponent } from "./ChatListPage.component";
import { ChatListPageNav } from "./ChatListPage.nav";
import { ChatListPageSkeleton } from "./ChatListPage.skeleton";

export function ChatListPageContainer(): ReactElement {
  const { t } = useTranslation("chat.list");

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.Chats],
    queryFn: () => chatsApi.getConversations(),
  });

  if (error) {
    return (
      <ChatListPageNav>
        <ErrorView message="Unable to get chats" />
      </ChatListPageNav>
    );
  }

  if (isPending) {
    return (
      <ChatListPageNav>
        <ChatListPageSkeleton />
      </ChatListPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChatListPageNav>
        <Typography sx={{ paddingTop: 1 }} gutterBottom>
          {t("no-chats")}
        </Typography>
      </ChatListPageNav>
    );
  }

  return (
    <ChatListPageNav>
      <ChatListPageComponent data={data} />
    </ChatListPageNav>
  );
}
