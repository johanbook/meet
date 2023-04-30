import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { SwipeCommand } from "../contracts/swipe.command";
import { SwipeHandler } from "./swipe.handler";

describe(SwipeHandler.name, () => {
  let commandHandler: SwipeHandler;
  let swipes: Repository<Swipe>;
  let profile: Profile;
  let shownProfile: Profile;

  beforeEach(() => {
    swipes = createMockRepository<Swipe>();
    commandHandler = new SwipeHandler(swipes);

    profile = new Profile();
    profile.id = 1;

    shownProfile = new Profile();
    shownProfile.id = 2;
  });

  it("should save swipe to the database", async () => {
    const command = new SwipeCommand();
    command.profileId = profile.id;
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
