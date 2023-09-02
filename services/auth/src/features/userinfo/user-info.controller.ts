import { Body, Controller, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import EmailPassword from "supertokens-node/recipe/emailpassword";

import { Session } from "src/core/supertokens/session.decorator";
import { ISession } from "src/core/supertokens/session.interface";

import { GetUserInfoListByIdQuery } from "./get-user-info-list-by-id.query";
import { UpdateEmailCommand } from "./update-email.command";
import { UserDetails } from "./user.dto";

@Controller()
@ApiTags("userinfo")
export class UserInfoController {
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

  @Put("/userinfo/email")
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
