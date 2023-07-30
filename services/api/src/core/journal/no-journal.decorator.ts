import { SetMetadata } from "@nestjs/common";

export const IGNORE_JOURNAL_KEY = "ignore-jounal";

export const NoJournal = () => SetMetadata(IGNORE_JOURNAL_KEY, true);
