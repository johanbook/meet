import { ReactElement, useState } from "react";

import { Box, Typography } from "@mui/material";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { getDateDaysAgo } from "src/utils/time";

import { ProfileJournalPageComponent } from "./ProfileJournalPage.component";
import { ProfileJournalPageNav } from "./ProfileJournalPage.nav";

export function ProfileJournalPageContainer(): ReactElement {
  const [dateRange, setDateRange] = useState({
    to: new Date(),
    from: getDateDaysAgo(2),
  });

  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.Journal, dateRange],
    queryFn: () => journalApi.getProfileJournal(dateRange),
  });

  if (error) {
    return (
      <ProfileJournalPageNav onDateChange={setDateRange} values={dateRange}>
        <ErrorMessage error={error} />
      </ProfileJournalPageNav>
    );
  }

  if (isLoading) {
    return (
      <ProfileJournalPageNav onDateChange={setDateRange} values={dateRange}>
        <Box sx={{ marginTop: 2 }}>
          <ProfileJournalPageComponent data={[]} loading />
        </Box>
      </ProfileJournalPageNav>
    );
  }

  if (!data) {
    return (
      <ProfileJournalPageNav onDateChange={setDateRange} values={dateRange}>
        <Typography>No entries found in journal</Typography>
      </ProfileJournalPageNav>
    );
  }

  return (
    <ProfileJournalPageNav onDateChange={setDateRange} values={dateRange}>
      <Box sx={{ marginTop: 2 }}>
        <ProfileJournalPageComponent data={data.entries} />
      </Box>
    </ProfileJournalPageNav>
  );
}
