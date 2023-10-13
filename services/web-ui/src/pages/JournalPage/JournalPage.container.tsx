import React from "react";

import { Typography } from "@mui/material";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { JournalPageComponent } from "./JournalPage.component";
import { JournalPageNav } from "./JournalPage.nav";
import { JournalPageSkeleton } from "./JournalPage.skeleton";

export function JournalPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery(CacheKeysConstants.Journal, () =>
    journalApi.getJournal()
  );

  if (error) {
    return (
      <JournalPageNav>
        <ErrorMessage error={error} />
      </JournalPageNav>
    );
  }

  if (isLoading) {
    return (
      <JournalPageNav>
        <JournalPageSkeleton />
      </JournalPageNav>
    );
  }

  if (!data || data.entries.length === 0) {
    return (
      <JournalPageNav>
        <Typography>No entries found in journal</Typography>
      </JournalPageNav>
    );
  }

  return (
    <JournalPageNav>
      <JournalPageComponent data={data.entries} />
    </JournalPageNav>
  );
}
