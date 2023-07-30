import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("/login")
@ApiTags("login")
export class LoginController {
  @Get("/config")
  config(): Record<string, string> {
    return {
      API_DOMAIN: process.env.API_URL || `http://localhost`,
      UI_DOMAIN: process.env.UI_URL || `http://localhost`,
    };
  }
}
