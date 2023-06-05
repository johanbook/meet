import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { UpdateSettingsCommand } from "../../application/contracts/commands/update-settings.comamnd";
import { SettingsDetails } from "../../application/contracts/dtos/settings-details.dto";
import { GetSettingsQuery } from "../../application/contracts/queries/get-settings.query";

@Controller("settings")
@ApiTags("settings")
export class SettingsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentSettings(): Promise<SettingsDetails> {
    const query = new GetSettingsQuery();
    return await this.queryBus.execute(query);
  }

  @Post("/update")
  async updateCurrentSettings(
    @Body() command: UpdateSettingsCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
