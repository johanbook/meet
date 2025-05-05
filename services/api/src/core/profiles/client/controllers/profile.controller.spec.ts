import { Test, TestingModule } from "@nestjs/testing";
import { QueryBus } from "@nestjs/cqrs";

import { GetProfileQuery } from "../../application/contracts/queries/get-profile.query";
import { ProfileController } from "./profile.controller";

describe(ProfileController.name, () => {
  let appController!: ProfileController;

  let queryBus: QueryBus;
  beforeEach(async () => {
    const mockQueryBus = { execute: jest.fn().mockResolvedValue({ id: "1" }) };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: QueryBus, useValue: mockQueryBus }],
    }).compile();

    appController = app.get<ProfileController>(ProfileController);
    queryBus = app.get<QueryBus>(QueryBus);
  });

  describe("getProfile", () => {
    it("should execute query and return profile details", async () => {
      const query = new GetProfileQuery();
      const result = await appController.getProfile(query);

      expect(queryBus.execute).toHaveBeenCalledWith(query);
      expect(result).toEqual({ id: "1" });
    });
  });
});
