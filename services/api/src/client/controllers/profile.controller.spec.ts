import { CqrsModule } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { ApplicationModule } from "src/application/application.module";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { ProfileController } from "./profile.controller";

describe.skip("ProfileController", () => {
  let appController!: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule, CqrsModule],
      controllers: [ProfileController],
      providers: [
        {
          provide: getRepositoryToken(Profile),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(ProfilePhoto),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    appController = app.get<ProfileController>(ProfileController);
  });

  describe("getCurrentProfile", () => {
    it("should return profile id", async () => {
      const currentProfile = await appController.getCurrentProfile("1");
      expect(currentProfile.id).toBe("1");
    });
  });
});
