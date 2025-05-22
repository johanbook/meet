import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { CurrentProfileService, Profile } from "src/core/profiles";
import { beforeEach, describe, expect, it } from "src/test";
import { createMockRepository, createUserIdServiceMock } from "src/test/mocks";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";
import { CreateJournalEntryHandler } from "./create-journal-entry.handler";

describe(CreateJournalEntryHandler.name, () => {
  let commandHandler: CreateJournalEntryHandler;
  let journalEntries: Repository<JournalEntry>;
  let currentOrganizationService: CurrentOrganizationService;
  let currentProfileService: CurrentProfileService;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  beforeEach(() => {
    profiles = createMockRepository<Profile>([{} as any]);
    journalEntries = createMockRepository<JournalEntry>();
    userIdService = createUserIdServiceMock();

    currentOrganizationService = createCurrentOrganizationServiceMock();

    currentProfileService = new CurrentProfileService(profiles, userIdService);

    commandHandler = new CreateJournalEntryHandler(
      currentOrganizationService,
      currentProfileService,
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

      expect(journalEntries.save).toHaveBeenCalledTimes(1);
    });
  });
});
