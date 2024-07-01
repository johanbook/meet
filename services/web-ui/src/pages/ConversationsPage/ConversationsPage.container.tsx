import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ConversationsPageComponent } from "./ConversationsPage.component";
import { ConversationsPageNav } from "./ConversationsPage.nav";
import { ConversationsPageSkeleton } from "./ConversationsPage.skeleton";

export function ConversationsPageContainer(): ReactElement {
  const { t } = useTranslation("connections");

  const { error, data, isPending } = useQuery({
    queryKey: ["chat-conversations"],
    queryFn: () => chatsApi.getConversations(),
  });

  if (error) {
    return (
      <ConversationsPageNav>
        <ErrorView error={error} />
      </ConversationsPageNav>
    );
  }

  if (isPending) {
    return (
      <ConversationsPageNav>
        <ConversationsPageSkeleton />
      </ConversationsPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ConversationsPageNav>
        <Typography sx={{ paddingTop: 1 }} gutterBottom>
          {t("no-connections")}
        </Typography>
      </ConversationsPageNav>
    );
  }

  return (
    <ConversationsPageNav>
      <ConversationsPageComponent data={data} />
    </ConversationsPageNav>
  );
}
