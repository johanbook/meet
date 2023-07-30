import { SwipeDomainService } from "src/domain/swipes/services/swipes-domain.service";
import { CurrentProfileService, Profile } from "src/features/profiles";

import { SwipeCommand } from "../contracts/swipe.command";
import { SwipeHandler } from "./swipe.handler";

describe(SwipeHandler.name, () => {
  let commandHandler: SwipeHandler;
  let currentProfileService: CurrentProfileService;
  let swipeDomainService: SwipeDomainService;

  let profile: Profile;
  let shownProfile: Profile;

  beforeEach(() => {
    profile = new Profile();
    profile.id = 1;

    shownProfile = new Profile();
    shownProfile.id = 2;

    currentProfileService = {
      fetchCurrentProfile: jest.fn(() => profile),
    } as any;
    swipeDomainService = { saveSwipe: jest.fn() } as any;

    commandHandler = new SwipeHandler(
      currentProfileService,
      swipeDomainService,
    );
  });

  it("should save swipe to the database", async () => {
    const command = new SwipeCommand();
    command.shownProfileId = shownProfile.id;
    command.liked = true;

    await commandHandler.execute(command);

    expect(swipeDomainService.saveSwipe).toHaveBeenCalledWith({
      liked: command.liked,
      profile: profile,
      shownProfile: shownProfile,
    });
  });
});
