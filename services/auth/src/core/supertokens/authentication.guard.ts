import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Error as STError } from "supertokens-node";
import { VerifySessionOptions } from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/fastify";

import { Logger } from "../logging/logger.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private logger = new Logger(AuthenticationGuard.name);

  constructor(private readonly verifyOptions?: VerifySessionOptions) {}

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const context = executionContext.switchToHttp();

    const resp = context.getResponse();

    await verifySession(this.verifyOptions)(context.getRequest(), resp);

    if (resp.headersSent) {
      this.logger.warn("Denied authentication");

      throw new STError({
        message: "RESPONSE_SENT",
        type: "RESPONSE_SENT",
      });
    }

    return true;
  }
}
