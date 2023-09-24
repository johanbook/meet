# Authorization

The software system comes with a organization-level RBAC-based authorization
framework.

## Types of resources

There are three types of resources in the system:

- **Individual resources** which are owned by a single account. Examples are
  account settings.
- **Organizational resources** which are owned by an organization. They can also
  be owned by both an organization and an account at the same time. Examples are
  blog posts and chat messages.
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

Authorization is specified on a route level inside the controllers.

#### Available roles

Roles are defined in
`./services/api/src/core/authorization/organization-roles.enum.ts`. They will
however later be moved into the database.

#### Creating permissions

All permissions are kept in a permissions file
`src/features/my-module/my-module.permissions.ts`:

```ts
import { OrganizationRole } from "src/core/authorization";

export const monkeyPermissions: Permissions = {
  Create: [OrganizationRole.Admin, OrganizationRole.Member],
  Delete: [OrganizationRole.Admin],
  Read: [OrganizationRole.Admin, OrganizationRole.Member],
  Update: [OrganizationRole.Admin],
};
```

#### Requiring permissions

An authorization check is added to a controller using the
`RequiresOrganizationPermissions` decorator like so:

```ts
import { Body, Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { RequiresOrganizationPermissions } from "src/core/authorization";

import { MonkeyDetails } from "../../application/contracts/dtos/monkey-details.dto.query";
import { GetMonkiesQuery } from "../../application/contracts/queries/get-monkies.query";
import { organizationPermissions } from "../../organization.permissions";

@Controller("monkies")
@ApiTags("monkies")
export class MonkeyController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @RequiresOrganizationPermissions(monkeyPermissions.Read)
  async getMonkies(@Query() query: GetMonkiesQuery): Promise<MonkeyDetails[]> {
    return await this.queryBus.execute(query);
  }
}
```

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
