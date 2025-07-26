import { ReactElement, useState } from "react";

import { Box, Typography } from "@mui/material";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { getDateDaysAgo } from "src/utils/time";

import { OrganizationJournalPageComponent } from "./OrganizationJournalPage.component";
import { OrganizationJournalPageNav } from "./OrganizationJournalPage.nav";

export function OrganizationJournalPageContainer(): ReactElement {
  const [dateRange, setDateRange] = useState({
    to: new Date(),
    from: getDateDaysAgo(2),
  });

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeyEnum.Journal, dateRange],
    queryFn: () => journalApi.getCurrentOrganizationJournal(dateRange),
  });

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

  if (isPending) {
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
