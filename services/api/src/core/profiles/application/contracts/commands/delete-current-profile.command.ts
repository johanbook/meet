import { NoJournal } from "src/core/journal";

// Cannot be journalized as there is no user id to associate it to
@NoJournal()
export class DeleteCurrentProfileCommand {}
