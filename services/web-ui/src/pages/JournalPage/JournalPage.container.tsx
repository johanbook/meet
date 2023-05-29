import React from "react";
import { useQuery } from "react-query";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { format } from "src/utils/string";

import { JournalPageHeader } from "./JournalPage.header";
import { JournalPageSkeleton } from "./JournalPage.skeleton";

export function JournalPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("journal", () =>
    journalApi.getJournal()
  );

  if (error) {
    const message = (error as Error).message;
    return (
      <>
        <JournalPageHeader />
        <ErrorMessage message={message} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <JournalPageHeader />
        <JournalPageSkeleton />
      </>
    );
  }

  if (!data || data.entries.length === 0) {
    return (
      <>
        <JournalPageHeader />
        <Typography>No entries found in journal</Typography>
      </>
    );
  }

  return (
    <>
      <JournalPageHeader />

      <List>
        {data.entries.map((element) => (
          <ListItem>
            <ListItemText
              primary={format(element.commandName)}
              secondary={element.created.toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
