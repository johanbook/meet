# Authorization

The software system comes with a RBAC-based authorization framework.

The system uses an authorization-first approach, meaning permissions has to be
specified (or disabled) for every action taken in the system.

## Types of resources

There are three types of resources in the system:

- **Individual resources** which are owned by a single account. Examples are
  account settings.
- **Organizational resources** which are owned by an organization. They can also
  be owned by both an organization and an account at the same time.
- **System resources** that are owned by the system, for example
  [classifications](./classifications.md).

Authorization works differently for the different kinds of resources.

Types of permissions:

- **Organization member permissions** are permissions that controls what a
  member can access within an organization.
- **Organization permissions** (also called **features**) are permissions that
  control what features an organization can access.

## Guide

### Backend

**The backend authorization is currently under construction**

When the authorization module is enabled, all command and query handlers have to
specify which permissions are required when being executed. If a handler does
not require any authorization checks, this has to be specified explicitly.

#### Available roles

Roles are defined in `./services/api/src/core/authorization/roles.ts`

```ts
export enum Roles {
  member,
  owner,
}
```

#### Creating permissions

All permissions are kept in a permissions file
`src/features/my-module/permissions.ts`:

```ts
import {
  createPermission,
  PermissionsDefinition,
} from "src/core/authorization";

export class ProfilePermissions extends PermissionsDefinition {
  static Create = createPermission(Permissions.Update(Profile), {
    admin: true,
    viewer: false,
  });

  static Read = createPermission(Permissions.Update(Profile), {
    admin: true,
    viewer: true,
  });

  static Update = createPermission(Permissions.Update(Profile), {
    admin: true,
    viewer: false,
  });
}
```

#### Requiring permissions

An authorization check is added to command and query using the
`RequirePermissions` keyword like so:

```ts
import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RequirePermissions, Permission } from "src/core/authorization";
import { Profile } from "src/features/profiles";

import { UpdateProfileCommand } from "../contracts/update-profile.command";

@CommandHandler(UpdateProfileCommand)
@RequirePermissions([Permissions.Update(Profile)]) // <-- Adds permission check to handler
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand, void>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(command: UpdateProfileCommand) {
    // Code goes here ...
  }
}
```

If a handler should not do any authorization checks, one should instead use the
`RequireNoPermissions()` decorator.

### Frontend

To do authorization checks in the frontend, one should use the
`useAuthorization` hook like done below.

```tsx
import { Permissions, useAuthorization } from "src/core/authorization";

export function MyComponent(): React.ReactElement {
  const authorization = useAuthorization();

  if (authorization.error) {
    return <p>There was an error while loading authorization</p>;
  }

  if (authorization.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {authorization.hasPermission(Permissions.Organization.View) && (
        <p>Authorized data</p>
      )}

      <p>My content</p>
    </>
  );
}
```
