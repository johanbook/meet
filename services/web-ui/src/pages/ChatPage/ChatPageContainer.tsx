import React from "react";
import { useQuery } from "react-query";

import { Typography } from "@mui/material";

import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { ChatPageHeader } from "./ChatPageHeader";
import { ChatPageSkeleton } from "./ChatPageSkeleton";

export default function ChatPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("allChats", () => false);

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

  if (!data) {
    return (
      <>
        <ChatPageHeader />

        <Typography gutterBottom variant="h6">
          You do not have any matches yet
        </Typography>
        <Typography>Keep on swiping to get your first match</Typography>
      </>
    );
  }

  return (
    <>
      <ChatPageHeader />
    </>
  );
}
