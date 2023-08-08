import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { createMockRepository, createUserIdServiceMock } from "src/test/mocks";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";
import { CreateJournalEntryHandler } from "./create-journal-entry.handler";

describe(CreateJournalEntryHandler.name, () => {
  let commandHandler: CreateJournalEntryHandler;
  let journalEntries: Repository<JournalEntry>;
  let userIdService: UserIdService;

  beforeEach(() => {
    journalEntries = createMockRepository<JournalEntry>();
    userIdService = createUserIdServiceMock();

    commandHandler = new CreateJournalEntryHandler(
      journalEntries,
      userIdService,
    );
  });

  describe("can create journal entry", () => {
    it("should save changes to journal entry", async () => {
      const command = map(CreateJournalEntryCommand, {
        commandName: "my-command",
        payload: {},
      });

      await commandHandler.execute(command);

      expect(journalEntries.save).toHaveBeenCalledTimes(1);
    });
  });
});
