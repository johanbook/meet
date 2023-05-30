import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";

import { Session } from "../supertokens/session.decorator";
import { ISession } from "../supertokens/session.interface";

const PATH_PREFIX = process.env.PATH_PREFIX || `/login`;
const UI_DOMAIN = process.env.UI_URL || `http://localhost`;

const HTTP_HEADER_USER_ID = process.env.USER_ID_HTTP_HEADER || "x-user-id";

@Controller()
@ApiTags("authentication")
export class AuthenticationController {
  @Get("/authenticate")
  authenticate(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession,
  ): void {
    if (!session) {
      response.status(401).send();
      return;
    }

    response.header(HTTP_HEADER_USER_ID, session.getUserId());
    response.status(200).send();
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
      response.status(301).redirect(`${UI_DOMAIN}${PATH_PREFIX}`);
      return;
    }

    response.header(HTTP_HEADER_USER_ID, session.getUserId());
    response.status(200).send();
  }
}
