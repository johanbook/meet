import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { TestSuite, beforeEach, describe, expect, it } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";
import { CreateJournalEntryHandler } from "./create-journal-entry.handler";

describe(CreateJournalEntryHandler.name, () => {
  let commandHandler: CreateJournalEntryHandler;
  let journalEntries: Repository<JournalEntry>;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    journalEntries = createMockRepository<JournalEntry>();

    commandHandler = new CreateJournalEntryHandler(
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
      journalEntries,
    );
  });

  describe("can create journal entry", () => {
    it("should save changes to journal entry", async () => {
      const command = map(CreateJournalEntryCommand, {
        commandName: "my-command",
        payload: {},
      });

      await commandHandler.execute(command);

      expect(journalEntries.find()).toHaveLength(1);
    });
  });
});
