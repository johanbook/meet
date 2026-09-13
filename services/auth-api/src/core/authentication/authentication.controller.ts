import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";

import { Logger } from "../logging/logger.service";
import { Session } from "../supertokens/session.decorator";
import { ISession } from "../supertokens/session.interface";

const HTTP_HEADER_USER_ID = process.env.USER_ID_HTTP_HEADER || "x-user-id";

@Controller()
@ApiTags("authentication")
export class AuthenticationController {
  private logger = new Logger(AuthenticationController.name);

  @Get("/authenticate")
  async authenticate(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession,
  ): Promise<void> {
    if (!session) {
      this.logger.trace("Denied authentication");

      response.status(HttpStatus.UNAUTHORIZED).send();

      return;
    }

    const userId = session.getUserId();

    if (!userId) {
      this.logger.error("UserID or user info missing");

      response.status(HttpStatus.UNAUTHORIZED).send();

      return;
    }

    this.logger.trace("Authentication approved");

    response.header(HTTP_HEADER_USER_ID, userId);
    response.status(HttpStatus.OK).send();
  }
}
