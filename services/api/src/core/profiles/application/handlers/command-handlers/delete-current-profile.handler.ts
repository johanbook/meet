import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentProfileService } from "../../../domain/services/current-profile.service";
import { ProfileService } from "../../../domain/services/profile.service";
import { DeleteCurrentProfileCommand } from "../../contracts/commands/delete-current-profile.command";

@CommandHandler(DeleteCurrentProfileCommand)
export class DeleteCurrentProfileHandler implements ICommandHandler<
  DeleteCurrentProfileHandler,
  void
> {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly profileService: ProfileService,
  ) {}

  async execute() {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    await this.profileService.deleteProfile(currentProfile);
  }
}
