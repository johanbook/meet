import { Repository } from "typeorm";

import { CurrentSettingsService } from "src/features/settings/domain/services/current-settings.service";
import { Settings } from "src/features/settings/infrastructure/entities/settings.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { CreateSettingsHandler } from "./create-settings.handler";

describe(CreateSettingsHandler.name, () => {
  let currentSettingsService: CurrentSettingsService;
  let commandHandler: CreateSettingsHandler;
  let settings: Repository<Settings>;

  beforeEach(() => {
    settings = createMockRepository<Settings>();

    const currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => 1),
    } as any;

    currentSettingsService = new CurrentSettingsService(
      currentProfileService,
      settings,
    );

    commandHandler = new CreateSettingsHandler(
      currentProfileService,
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
        profileId: 1,
      });
    });
  });
});
