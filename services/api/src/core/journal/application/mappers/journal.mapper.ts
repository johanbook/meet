import { JournalEntry } from "src/core/journal/infrastructure/entities/journal-entry.entity";
import { map, mapArray } from "src/utils/mapper";

import { JournalDetails } from "../contracts/dtos/journal-details.dto";
import { JournalEntryDetails } from "../contracts/dtos/journal-entry-details.dto";

function formatCommandName(commandName: string): string {
  return commandName.replace(/Command$/, "");
}

export interface MapToJournalDetailsProps {
  entries: JournalEntry[];
}

export function mapToJournalDetails({
  entries,
}: MapToJournalDetailsProps): JournalDetails {
  const mappedEntries = mapArray(JournalEntryDetails, entries, (entry) => ({
    commandName: formatCommandName(entry.commandName),
    created: entry.created,
    payload: entry.payload,
  }));

  return map(JournalDetails, { entries: mappedEntries });
}
