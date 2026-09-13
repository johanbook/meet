import { useState } from "react";
import { ScrollView, View } from "react-native";

import { journalApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import {
  DATE_SHORTCUTS,
  DateRange,
  DateRangePicker,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { JournalEntryListItem } from "src/features/profiles";
import { ErrorView } from "src/views/ErrorView";

export default function GroupJournalPage() {
  const [range, setRange] = useState<DateRange>(DATE_SHORTCUTS.LastMonth);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      CacheKeyEnum.Journal,
      "currentOrganization",
      range.from,
      range.to,
    ],
    queryFn: () =>
      journalApi.getCurrentOrganizationJournal({
        from: range.from,
        to: range.to,
      }),
  });

  if (isLoading) {
    return (
      <Screen navBackTo="/group" title="Group journal">
        <List>
          {[0, 1, 2, 3].map((index) => (
            <ListItem key={index}>
              <Skeleton height={16} width="60%" />
              <Skeleton height={14} width="85%" />
            </ListItem>
          ))}
        </List>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen navBackTo="/group" title="Group journal">
        <ErrorView />
      </Screen>
    );
  }

  return (
    <Screen navBackTo="/group" title="Group journal">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 8 }}>
          <DateRangePicker onValueChange={setRange} value={range} />
        </View>
        {data.entries.length === 0 ? (
          <View style={{ alignItems: "center", padding: 48 }}>
            <Typography color="textSecondary">No journal entries</Typography>
          </View>
        ) : (
          <List>
            {data.entries.map((entry) => (
              <JournalEntryListItem key={entry.id} entry={entry} />
            ))}
          </List>
        )}
      </ScrollView>
    </Screen>
  );
}