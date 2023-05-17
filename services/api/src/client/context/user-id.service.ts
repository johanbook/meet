import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { RequestContext } from "./request-context.interface";

@Injectable()
export class UserIdService {
  constructor(private readonly als: AsyncLocalStorage<RequestContext>) {}

  getUserId() {
    const store = this.als.getStore();

    if (!store) {
      throw new Error("Unable to obtain store from AsyncLocalStorage");
    }

    return store.userId;
  }
}
