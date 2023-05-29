import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PermissionsService } from "../context/permissions.service";

@Controller("permissions")
@ApiTags("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async getPermissions(): Promise<string[]> {
    return this.permissionsService.getPermissions();
  }
}
