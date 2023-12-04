import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDateDaysAgo } from "src/utils/time";

import { OrganizationJournalPageComponent } from "./OrganizationJournalPage.component";
import { OrganizationJournalPageNav } from "./OrganizationJournalPage.nav";

export function OrganizationJournalPageContainer(): React.ReactElement {
  const [dateRange, setDateRange] = useState({
    to: new Date(),
    from: getDateDaysAgo(2),
  });

  const { error, data, isLoading } = useQuery(
    [CacheKeysConstants.Journal, dateRange.from, dateRange.to],
    () => journalApi.getCurrentOrganizationJournal(dateRange)
  );

  if (error) {
    return (
      <OrganizationJournalPageNav
        onDateChange={setDateRange}
        values={dateRange}
      >
        <ErrorMessage error={error} />
      </OrganizationJournalPageNav>
    );
  }

  if (isLoading) {
    return (
      <OrganizationJournalPageNav
        onDateChange={setDateRange}
        values={dateRange}
      >
        <Box sx={{ marginTop: 2 }}>
          <OrganizationJournalPageComponent data={[]} loading />
        </Box>
      </OrganizationJournalPageNav>
    );
  }

  if (!data) {
    return (
      <OrganizationJournalPageNav
        onDateChange={setDateRange}
        values={dateRange}
      >
        <Typography>No entries found in journal</Typography>
      </OrganizationJournalPageNav>
    );
  }

  return (
    <OrganizationJournalPageNav onDateChange={setDateRange} values={dateRange}>
      <Box sx={{ marginTop: 2 }}>
        <OrganizationJournalPageComponent data={data.entries} />
      </Box>
    </OrganizationJournalPageNav>
  );
}
