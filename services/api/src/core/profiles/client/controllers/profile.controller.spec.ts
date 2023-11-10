import { CqrsModule } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { GetProfileQuery } from "../../application/contracts/queries/get-profile.query";
import { ProfilePhoto } from "../../infrastructure/entities/profile-photo.entity";
import { Profile } from "../../infrastructure/entities/profile.entity";
import { ProfileController } from "./profile.controller";

describe.skip(ProfileController.name, () => {
  let appController!: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
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
      const currentProfile = await appController.getProfile(
        new GetProfileQuery(),
      );
      expect(currentProfile.id).toBe("1");
    });
  });
});
