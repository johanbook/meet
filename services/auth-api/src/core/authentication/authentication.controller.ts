import { Controller, Get, Headers, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";

import { Logger } from "../logging/logger.service";
import { Session } from "../supertokens/session.decorator";
import { ISession } from "../supertokens/session.interface";
import { parseBearerToken, verifyAccessToken } from "./access-token";

const HTTP_HEADER_USER_ID = process.env.USER_ID_HTTP_HEADER || "x-user-id";

@Controller()
@ApiTags("authentication")
export class AuthenticationController {
  private logger = new Logger(AuthenticationController.name);

  /**
   * Gateway callback used by Traefik forward-auth for every /api request.
   * When the request carries an Authorization header (native clients), that
   * access token is verified against the session core; otherwise the usual
   * cookie session flow applies (PWA/browser).
   */
  @Get("/authenticate")
  async authenticate(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession,
    @Headers() headers: Record<string, string | undefined>,
  ): Promise<void> {
    const authorizationValue = headers["authorization"];

    const userId = authorizationValue
      ? await this.resolveBearerUserId(authorizationValue)
      : session?.getUserId();

    this.sendAuthentication(userId, response);
  }

  private async resolveBearerUserId(
    authorizationValue?: string,
  ): Promise<string | undefined> {
    const accessToken = parseBearerToken(authorizationValue);

    if (!accessToken) {
      return undefined;
    }

    return verifyAccessToken(accessToken);
  }

  private sendAuthentication(
    userId: string | undefined,
    response: FastifyReply,
  ): void {
    if (!userId) {
      this.logger.trace("Denied authentication");

      response.status(HttpStatus.UNAUTHORIZED).send();

      return;
    }

    this.logger.trace("Authentication approved");

    response.header(HTTP_HEADER_USER_ID, userId);
    response.status(HttpStatus.OK).send();
  }
}
