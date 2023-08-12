import { CurrentProfileService, Profile } from "src/features/profiles";

import { SwipeService } from "../../../domain/services/swipe.service";
import { SwipeCommand } from "../../contracts/commands/swipe.command";
import { SwipeHandler } from "./swipe.handler";

describe(SwipeHandler.name, () => {
  let commandHandler: SwipeHandler;
  let currentProfileService: CurrentProfileService;
  let swipeService: SwipeService;

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
    swipeService = { saveSwipe: jest.fn() } as any;

    commandHandler = new SwipeHandler(currentProfileService, swipeService);
  });

  it("should save swipe to the database", async () => {
    const command = new SwipeCommand();
    command.shownProfileId = shownProfile.id;
    command.liked = true;

    await commandHandler.execute(command);

    expect(swipeService.saveSwipe).toHaveBeenCalledWith({
      liked: command.liked,
      profileId: profile.id,
      shownProfileId: shownProfile.id,
    });
  });
});
