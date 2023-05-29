import React from "react";
import { useQuery } from "react-query";

import { List, ListItem, ListItemText } from "@mui/material";
import { capitalize, lowerCase } from "lodash";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

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
        No data
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
              primary={capitalize(lowerCase(element.commandName))}
              secondary={element.created.toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
