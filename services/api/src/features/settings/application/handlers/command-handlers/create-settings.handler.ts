import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/core/profiles";
import { CurrentSettingsService } from "src/features/settings/domain/services/current-settings.service";
import { Settings } from "src/features/settings/infrastructure/entities/settings.entity";

import { CreateSettingsCommand } from "../../contracts/commands/create-settings.command";

@CommandHandler(CreateSettingsCommand)
export class CreateSettingsHandler implements ICommandHandler<
  CreateSettingsCommand,
  void
> {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly currentSettingsService: CurrentSettingsService,
    @InjectRepository(Settings)
    private readonly settings: Repository<Settings>,
  ) {}

  async execute() {
    const settingsAlreadyExists =
      await this.currentSettingsService.checkIfExists();

    if (settingsAlreadyExists) {
      throw new BadRequestException("Settings has already been created");
    }

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const newSettings = new Settings();
    newSettings.darkmode = false;
    newSettings.profileId = currentProfileId;

    await this.settings.save(newSettings);
  }
}
