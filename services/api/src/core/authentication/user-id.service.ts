import { Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { AsyncLocalStorage } from "node:async_hooks";

import { IRequestContext, REQUEST_CONTEXT_KEY } from "src/core/request-context";

import { MissingUserIdError } from "./missing-user-id.error";

const AUTH_API_URL = "http://auth-api";

@Injectable()
export class UserIdService {
  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly als: AsyncLocalStorage<IRequestContext>,
  ) {}

  getUserId(): string {
    const store = this.als.getStore();

    if (!store) {
      throw new MissingUserIdError(
        "Unable to obtain user ID due to missing store",
      );
    }

    const userId = store.userId;

    if (!userId) {
      throw new MissingUserIdError("Unable to obtain user ID");
    }

    return userId;
  }

  async fetchUserEmailsByUserIds(userIds: string[]): Promise<string[]> {
    const { data } = await axios.post(
      `${AUTH_API_URL}/userinfo/list-by-userid`,
      {
        userIds,
      },
    );

    return Object.values(data as Record<string, { email: string }>).map(
      (user) => user.email,
    );
  }
}
