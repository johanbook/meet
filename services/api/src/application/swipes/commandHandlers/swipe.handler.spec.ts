import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { SwipeCommand } from "../contracts/swipe.command";
import { SwipeHandler } from "./swipe.handler";

describe(SwipeHandler.name, () => {
  let commandHandler: SwipeHandler;
  let profiles: Repository<Profile>;
  let swipes: Repository<Swipe>;
  let userIdService: UserIdService;

  let profile: Profile;
  let shownProfile: Profile;

  beforeEach(() => {
    profiles = createMockRepository<Profile>();
    swipes = createMockRepository<Swipe>();
    userIdService = createUserIdServiceMock();

    commandHandler = new SwipeHandler(profiles, swipes, userIdService);

    profile = new Profile();
    profile.id = 1;

    const findOneFn = profiles.findOne as unknown as jest.Mock;
    findOneFn.mockImplementation(() => profile);

    shownProfile = new Profile();
    shownProfile.id = 2;
  });

  it("should save swipe to the database", async () => {
    const command = new SwipeCommand();
    command.shownProfileId = shownProfile.id;
    command.liked = true;

    await commandHandler.execute(command);

    expect(swipes.save).toHaveBeenCalledWith({
      liked: command.liked,
      profile: profile,
      shownProfile: shownProfile,
    });
  });
});
