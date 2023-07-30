import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PermissionsService } from "../../application/permissions.service";

@Controller("permissions")
@ApiTags("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async getPermissions(): Promise<string[]> {
    return await this.permissionsService.fetchPermissions();
  }
}
