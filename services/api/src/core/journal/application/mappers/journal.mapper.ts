import { JournalEntry } from "src/core/journal/infrastructure/entitities/journal-entry.entity";
import { map, mapArray } from "src/utils/mapper";

import { JournalDetails } from "../contracts/dtos/journal-details.dto";
import { JournalEntryDetails } from "../contracts/dtos/journal-entry-details.dto";

export interface MapToJournalDetailsProps {
  entries: JournalEntry[];
}

export function mapToJournalDetails({
  entries,
}: MapToJournalDetailsProps): JournalDetails {
  const mappedEntries = mapArray(JournalEntryDetails, entries, (entry) => ({
    commandName: entry.commandName,
    created: entry.created,
    payload: entry.profile,
  }));

  return map(JournalDetails, { entries: mappedEntries });
}
