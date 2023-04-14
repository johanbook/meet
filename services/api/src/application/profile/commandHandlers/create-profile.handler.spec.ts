import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { CreateProfileHandler } from "./create-profile.handler";

describe(CreateProfileHandler.name, () => {
  let commandHandler: CreateProfileHandler;

  beforeEach(() => {
    commandHandler = new CreateProfileHandler(createMockRepository<Profile>());
  });

  describe("can create new profile", () => {
    it("should return profile id", async () => {
      // const currentProfile = await appController.getCurrentProfile("1");
      // expect(currentProfile.id).toBe("1");
    });
  });
});
