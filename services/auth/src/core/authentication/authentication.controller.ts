import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import EmailPassword from "supertokens-node/recipe/emailpassword";

import { Logger } from "../logging/logger.service";
import { Session } from "../supertokens/session.decorator";
import { ISession } from "../supertokens/session.interface";
import { GetUserInfoListByIdQuery } from "./get-user-info-list-by-id.query";
import { UserDetails } from "./user.dto";

const HTTP_HEADER_EMAIL = process.env.EMAIL_HTTP_HEADER || "x-email";
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
    const userInfo = await EmailPassword.getUserById(userId);

    if (!userId || !userInfo) {
      this.logger.error("UserID or user info missing");

      response.status(HttpStatus.UNAUTHORIZED).send();

      return;
    }

    this.logger.trace("Authentication approved");

    response.header(HTTP_HEADER_EMAIL, userInfo.email);
    response.header(HTTP_HEADER_USER_ID, userId);
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

  // Endpoint is POST due to size limitations on URL in GET requests
  @Post("/userinfo/list-by-userid")
  async getUserInfo(
    @Body() body: GetUserInfoListByIdQuery,
  ): Promise<Record<string, UserDetails>> {
    const result: Record<string, EmailPassword.User> = {};

    for (const userId of body.userIds) {
      result[userId] = await EmailPassword.getUserById(userId);
    }

    return result;
  }
}
