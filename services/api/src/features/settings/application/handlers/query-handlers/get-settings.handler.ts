import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { map } from "src/core/mapper";
import { CurrentSettingsService } from "src/features/settings/domain/services/current-settings.service";

import { SettingsDetails } from "../../contracts/dtos/settings-details.dto";
import { GetSettingsQuery } from "../../contracts/queries/get-settings.query";

@QueryHandler(GetSettingsQuery)
export class GetSettingsHandler
  implements IQueryHandler<GetSettingsQuery, SettingsDetails>
{
  constructor(
    private readonly currentSettingsService: CurrentSettingsService,
  ) {}

  async execute() {
    const currentSettings =
      await this.currentSettingsService.fetchCurrentSettings();

    return map(SettingsDetails, {
      darkmode: currentSettings.darkmode,
    });
  }
}
