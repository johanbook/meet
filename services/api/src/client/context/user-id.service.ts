import { Inject, Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { ApplicationError } from "src/core/error-handling";

import { REQUEST_CONTEXT_KEY } from "./als.module";
import { RequestContext } from "./request-context.interface";

@Injectable()
export class UserIdService {
  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly als: AsyncLocalStorage<RequestContext>,
  ) {}

  getUserId() {
    const store = this.als.getStore();

    if (!store) {
      throw new ApplicationError(
        "Unable to obtain user ID due to missing store",
      );
    }

    return store.userId;
  }
}
