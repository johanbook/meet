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

Roles are defined in `./services/api/src/core/authorization/organization-roles.enum.ts`.

#### Creating permissions

All permissions are kept in a permissions file
src/features/my-module/permissions.ts:

```ts
import { OrganizationRole } from "src/core/authorization";

export const organizationPermissions = {
  CurrentOrganization: {
    Read: [OrganizationRole.Admin, OrganizationRole.Member],
    Members: {
      Add: [OrganizationRole.Admin],
      Read: [OrganizationRole.Admin, OrganizationRole.Member],
      UpdateOrganizationRole: [OrganizationRole.Admin],
    },
    Update: [OrganizationRole.Admin],
  },
};
```

#### Requiring permissions

An authorization check is added to command and query using the
`RequirePermissions` keyword like so:

```ts
import { Body, Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { RequiresPermissions } from "src/core/authorization";

import { GetOrganizationQuery } from "../../application/contracts/queries/get-organization.query";
import { organizationPermissions } from "../../organization.permissions";

@Controller("organizations/current")
@ApiTags("organizations")
export class CurrentOrganizationController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @RequiresPermissions(organizationPermissions.CurrentOrganization.Read)
  async getCurrentOrganization(
    @Query() query: GetOrganizationQuery
  ): Promise<CurrentOrganizationDetails> {
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
