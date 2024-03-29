import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import EmailPassword from "supertokens-node/recipe/emailpassword";

import { Session } from "src/core/supertokens/session.decorator";
import { ISession } from "src/core/supertokens/session.interface";

import { UpdateEmailCommand } from "../../application/contracts/commands/update-email.command";
import { UserDetails } from "../../application/contracts/dtos/user.dto";
import { GetUserInfoByEmailQuery } from "../../application/contracts/queries/get-user-info-by-email.query";
import { GetUserInfoListByEmailQuery } from "../../application/contracts/queries/get-user-info-list-by-email.query";
import { GetUserInfoListByIdQuery } from "../../application/contracts/queries/get-user-info-list-by-id.query";

@Controller("userinfo")
@ApiTags("userinfo")
export class UserInfoController {
  /** Endpoint is POST due to size limitations on URL in GET requests */
  @Post("/list-by-email")
  async getUserInfoListByEmail(
    @Body() body: GetUserInfoListByEmailQuery,
  ): Promise<Record<string, UserDetails>> {
    const result: Record<string, EmailPassword.User> = {};

    for (const email of body.emails) {
      result[email] = await EmailPassword.getUserByEmail(email);
    }

    return result;
  }

  /** Endpoint is POST due to size limitations on URL in GET requests */
  @Post("/list-by-userid")
  async getUserInfoListByUserId(
    @Body() body: GetUserInfoListByIdQuery,
  ): Promise<Record<string, UserDetails>> {
    const result: Record<string, EmailPassword.User> = {};

    for (const userId of body.userIds) {
      result[userId] = await EmailPassword.getUserById(userId);
    }

    return result;
  }

  @Get("/email")
  async getUserInfoByEmail(
    @Query() query: GetUserInfoByEmailQuery,
  ): Promise<UserDetails> {
    const result = await EmailPassword.getUserByEmail(query.email);

    if (!result) {
      throw new NotFoundException("User not found");
    }

    return result;
  }

  @Put("/email")
  async updateEmail(
    @Body() body: UpdateEmailCommand,
    @Session({ sessionRequired: true }) session: ISession,
  ) {
    await EmailPassword.updateEmailOrPassword({
      userId: session.getUserId(),
      email: body.email,
    });
  }
}
