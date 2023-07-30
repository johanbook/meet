import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";

import { Logger } from "../logging/logger.service";
import { Session } from "../supertokens/session.decorator";
import { ISession } from "../supertokens/session.interface";

const PATH_PREFIX = process.env.PATH_PREFIX || `/login`;
const UI_DOMAIN = process.env.UI_URL || `http://localhost`;

const HTTP_HEADER_USER_ID = process.env.USER_ID_HTTP_HEADER || "x-user-id";

@Controller()
@ApiTags("authentication")
export class AuthenticationController {
  private logger = new Logger(AuthenticationController.name);

  @Get("/authenticate")
  authenticate(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession,
  ): void {
    if (!session) {
      this.logger.trace("Denied authentication");

      response.status(HttpStatus.UNAUTHORIZED).send();

      return;
    }

    this.logger.trace("Authentication approved");

    response.header(HTTP_HEADER_USER_ID, session.getUserId());
    response.status(HttpStatus.OK).send();
  }

  @Get("/authenticate-with-redirect")
  authenticateWithRedirect(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession | undefined,
  ): void {
    if (!session) {
      this.logger.trace("Denied authentication. Redirecting");

      response
        .status(HttpStatus.TEMPORARY_REDIRECT)
        .redirect(`${UI_DOMAIN}${PATH_PREFIX}`);

      return;
    }

    this.logger.trace("Authentication approved");

    response.header(HTTP_HEADER_USER_ID, session.getUserId());
    response.status(HttpStatus.OK).send();
  }

  @Get("/logout")
  async logout(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession,
  ): Promise<void> {
    if (!session) {
      this.logger.trace("Failed logout due to missing session");

      response.status(HttpStatus.NOT_FOUND).send();

      return;
    }

    await session.revokeSession();

    this.logger.trace("Logout successful");

    response.status(HttpStatus.OK).send();
  }
}
