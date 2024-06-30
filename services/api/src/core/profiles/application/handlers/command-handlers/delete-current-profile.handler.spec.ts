import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { createEventBusMock } from "src/test/mocks";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { CurrentProfileService } from "../../../domain/services/current-profile.service";
import { ProfileService } from "../../../domain/services/profile.service";
import { Profile } from "../../../infrastructure/entities/profile.entity";
import { DeleteCurrentProfileHandler } from "./delete-current-profile.handler";

describe(DeleteCurrentProfileHandler.name, () => {
  let commandHandler: DeleteCurrentProfileHandler;
  let currentProfileService: CurrentProfileService;
  let eventBus: EventBus;
  let profiles: Repository<Profile>;
  let profileService: ProfileService;
  let userIdService: UserIdService;

  beforeEach(() => {
    eventBus = createEventBusMock();
    profiles = createMockRepository<Profile>();
    userIdService = createUserIdServiceMock();

    profileService = new ProfileService(eventBus, profiles);

    currentProfileService = new CurrentProfileService(profiles, userIdService);

    commandHandler = new DeleteCurrentProfileHandler(
      currentProfileService,
      profileService,
    );
  });

  describe("execute", () => {
    it("should delete current profile", async () => {
      const profile = new Profile();
      profiles.save(profile);

      expect(profiles.find()).not.toEqual([]);

      await commandHandler.execute();

      expect(profiles.find()).toEqual([]);
      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });
  });
});
