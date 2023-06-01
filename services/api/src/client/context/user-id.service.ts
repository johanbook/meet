import { Inject, Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/infrastructure/logger.service";

import { REQUEST_CONTEXT_KEY } from "./als.module";
import { RequestContext } from "./request-context.interface";

@Injectable()
export class UserIdService {
  private logger = new Logger(UserIdService.name);

  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly als: AsyncLocalStorage<RequestContext>,
  ) {}

  getUserId() {
    const store = this.als.getStore();

    if (!store) {
      this.logger.error("Unable to obtain user ID due to missing store");
      throw new Error("Unable fetch user ID");
    }

    return store.userId;
  }
}
