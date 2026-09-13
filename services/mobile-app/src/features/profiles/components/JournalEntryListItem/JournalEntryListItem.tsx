import { JournalEntryDetails } from "src/api";
import { ListItem, ListItemText } from "src/components/ui";
import { timeSince } from "src/utils";

interface JournalEntryListItemProps {
  entry: JournalEntryDetails;
}

export function JournalEntryListItem({ entry }: JournalEntryListItemProps) {
  return (
    <ListItem>
      <ListItemText
        primary={entry.commandName}
        secondary={`${entry.profile.name ?? "Unknown"} · ${timeSince(
          entry.createdAt.toISOString(),
        )}`}
      />
    </ListItem>
  );
}
