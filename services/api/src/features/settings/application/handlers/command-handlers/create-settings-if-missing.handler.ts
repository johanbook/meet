import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Logger } from "src/core/logging";
import { Profile } from "src/features/profiles";
import { Settings } from "src/features/settings/infrastructure/entities/settings.entity";

import { CreateSettingsIfMissingCommand } from "../../contracts/commands/create-settings-if-missing.command";

@CommandHandler(CreateSettingsIfMissingCommand)
export class CreateSettingsIfMissingHandler
  implements ICommandHandler<CreateSettingsIfMissingCommand, void>
{
  private logger = new Logger(CreateSettingsIfMissingHandler.name);

  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    @InjectRepository(Settings)
    private readonly settings: Repository<Settings>,
  ) {}

  async execute() {
    const profiles = await this.profiles.find({
      select: { id: true },
    });

    const settings = await this.settings.find({
      select: {
        profileId: true,
      },
      where: {
        profileId: In(profiles.map((profile) => profile.id)),
      },
    });

    const profileIdsWithSettings = new Set(settings.map((x) => x.profileId));

    for (const profile of profiles) {
      if (profileIdsWithSettings.has(profile.id)) {
        return;
      }

      await this.createSettings(profile.id);
    }
  }

  private async createSettings(profileId: number): Promise<void> {
    this.logger.debug(`Creating settings for profile with ID ${profileId}`);

    const newSettings = new Settings();
    newSettings.darkmode = false;
    newSettings.profileId = profileId;

    await this.settings.save(newSettings);
  }
}
