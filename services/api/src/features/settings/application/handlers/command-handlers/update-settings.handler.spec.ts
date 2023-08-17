import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentSettingsService } from "src/features/settings/domain/services/current-settings.service";
import { Settings } from "src/features/settings/infrastructure/entities/settings.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { UpdateSettingsCommand } from "../../contracts/commands/update-settings.comamnd";
import { UpdateSettingsHandler } from "./update-settings.handler";

describe(UpdateSettingsHandler.name, () => {
  let currentSettingsService: CurrentSettingsService;
  let commandHandler: UpdateSettingsHandler;
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

    commandHandler = new UpdateSettingsHandler(
      currentSettingsService,
      settings,
    );
  });

  describe("can update settings", () => {
    it("should throw if settings not found", async () => {
      const command = map(UpdateSettingsCommand, { darkmode: true });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Settings have not been created for this user yet. Please contact support.",
      );
    });

    it("should save changes to profile", async () => {
      const findOneFn = settings.findOne as unknown as jest.Mock;
      findOneFn.mockImplementation(() => ({ darkmode: false }));

      const command = map(UpdateSettingsCommand, {
        darkmode: true,
      });

      await commandHandler.execute(command);

      expect(settings.save).toHaveBeenCalledWith({
        darkmode: true,
      });
    });
  });
});
