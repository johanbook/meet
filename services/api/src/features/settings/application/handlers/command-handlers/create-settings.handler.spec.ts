import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { CurrentSettingsService } from "src/features/settings/domain/services/current-settings.service";
import { Settings } from "src/features/settings/infrastructure/entities/settings.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { CreateSettingsHandler } from "./create-settings.handler";

describe(CreateSettingsHandler.name, () => {
  let currentSettingsService: CurrentSettingsService;
  let commandHandler: CreateSettingsHandler;
  let settings: Repository<Settings>;
  let userIdService: UserIdService;

  beforeEach(() => {
    settings = createMockRepository<Settings>();
    userIdService = createUserIdServiceMock();

    currentSettingsService = new CurrentSettingsService(
      settings,
      userIdService,
    );

    commandHandler = new CreateSettingsHandler(
      currentSettingsService,
      settings,
    );
  });

  describe("can create settings", () => {
    it("should throw if settings not found", async () => {
      settings.exist = () => Promise.resolve(true);

      await expect(commandHandler.execute()).rejects.toHaveProperty(
        "message",
        "Settings has already been created",
      );
    });

    it("should save changes to profile", async () => {
      await commandHandler.execute();

      expect(settings.save).toHaveBeenCalledWith({
        darkmode: false,
      });
    });
  });
});
