# Authentication

Authentication is handled by a dedicated IdP. The default implementation of the
software system uses a self-hosted instance of
[Supertokens](https://supertokens.com/).

## Guide

By default all requests going to the `api` service requires authentication and
is done on the gateway layer. It is possible to create unauthenticated routes
(e.g. for healthchecks) by creating explicit ingress routes without
authentication.

### Accessing user info

In order to access user info, one should use the `AuthenticationModule`.

```ts
import { Injectable } from "@nestjs/common";

import { UserIdService } from "src/core/authentication";

@Injectable()
export class MonkeyService {
  constructor(private readonly userIdService: UserIdService) {}

  async getMonkeyEmail(): Promise<void> {
    const userId = this.userIdService.getUserId();
    const emails = await this.userIdService.fetchUserEmailsByUserIds([userId]);

    doStuff(emails);
  }
}
```
