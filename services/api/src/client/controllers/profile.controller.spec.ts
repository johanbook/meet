import { Test, TestingModule } from "@nestjs/testing";
import { ProfileController } from "./profile.controller";

describe("ProfileController", () => {
  let appController: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
    }).compile();

    appController = app.get<ProfileController>(ProfileController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getCurrentProfile("1")).toBe("Hello World!");
    });
  });
});
