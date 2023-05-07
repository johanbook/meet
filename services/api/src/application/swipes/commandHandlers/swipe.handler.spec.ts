import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";
import { createNotificationsGatewayMock } from "src/test/mocks/notifications.gateway.mock";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { SwipeCommand } from "../contracts/swipe.command";
import { SwipeHandler } from "./swipe.handler";

describe(SwipeHandler.name, () => {
  let commandHandler: SwipeHandler;
  let noficationsGateway: NotificationsGateway;
  let profiles: Repository<Profile>;
  let swipes: Repository<Swipe>;
  let userIdService: UserIdService;

  let profile: Profile;
  let shownProfile: Profile;

  beforeEach(() => {
    noficationsGateway = createNotificationsGatewayMock();
    profiles = createMockRepository<Profile>();
    swipes = createMockRepository<Swipe>();
    userIdService = createUserIdServiceMock();

    commandHandler = new SwipeHandler(
      noficationsGateway,
      profiles,
      swipes,
      userIdService,
    );

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
