import { Repository } from "typeorm";

import { Profile } from "src/core/profiles";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { Settings } from "../../../infrastructure/entities/settings.entity";
import { CreateSettingsIfMissingHandler } from "./create-settings-if-missing.handler";

describe(CreateSettingsIfMissingHandler.name, () => {
  let commandHandler: CreateSettingsIfMissingHandler;
  let profiles: Repository<Profile>;
  let settings: Repository<Settings>;

  beforeEach(() => {
    profiles = createMockRepository<Profile>([{ id: 1 } as any]);
    settings = createMockRepository<Settings>();

    commandHandler = new CreateSettingsIfMissingHandler(profiles, settings);
  });

  describe("creates settings if missing", () => {
    it("should create and save settings", async () => {
      await commandHandler.execute();

      expect(settings.save).toHaveBeenCalledWith({
        darkmode: false,
        profileId: 1,
      });
    });
  });
});
