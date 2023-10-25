import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/core/logging";
import { IRequestContext, REQUEST_CONTEXT_KEY } from "src/core/request-context";

import { MissingUserIdError } from "./missing-user-id.error";

const AUTH_API_URL = "http://auth-api";

@Injectable()
export class UserIdService {
  private logger = new Logger(UserIdService.name);
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

  async fetchUserIdByEmail(email: string): Promise<string | undefined> {
    try {
      const { data } = await axios.get<{ id: string }>(
        `${AUTH_API_URL}/userinfo/email?email=${encodeURIComponent(email)}`,
      );
      return data.id;
    } catch (error) {
      const { status } = error as AxiosError;

      // 404 are part of normal operation. All other error codes are not
      if (status !== 404) {
        this.logger.warn("Failed to lookup user email", { error });
      }

      if (!status || status >= 500) {
        throw new ServiceUnavailableException(
          "Unable to reach user id service",
        );
      }
    }
  }
}
