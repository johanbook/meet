import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentSettingsService } from "src/features/settings/domain/services/current-settings.service";
import { Settings } from "src/features/settings/infrastructure/entities/settings.entity";

import { UpdateSettingsCommand } from "../../contracts/commands/update-settings.comamnd";

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  implements ICommandHandler<UpdateSettingsCommand, void>
{
  constructor(
    private readonly currentSettingsService: CurrentSettingsService,
    @InjectRepository(Settings)
    private readonly settings: Repository<Settings>,
  ) {}

  async execute(command: UpdateSettingsCommand) {
    const currentSettings =
      await this.currentSettingsService.fetchCurrentSettings();

    if (command.darkmode !== undefined) {
      currentSettings.darkmode = command.darkmode;
    }

    await this.settings.save(currentSettings);
  }
}
