# Organizations and profiles

The system comes with built-in systems for organizations (workspaces) and
profiles. Below the default implementation is outlined. This is not set in stone
and can be changed.

## Personal organizations

Each profile is created together with a **personal organization** in which only
that profile can be a member. Personal organizations act as a personal space
where a user can store resources they wish other users cannot access.

Personal organizations cannot be removed or leaved. This is to avoid leaving
profiles in a state without being associated to any organizations.

## Creating organizations

Any profile can by default create new organizations.

If the system is to be introduced into a SaaS, it is recommended require a
subscription per organization.

## Removing member from an organization

An organization admin can remove a member (but not their self). If that member
has this organization as active, their active organization is changed to their
personal one.

## Leaving organizations

It is possible for a profile to leave an organization if:

- They are not the last member of that organization
- They are not the last admin of that organization

## Deleting organizations

An organization can be deleted at **any time** by its admins. When doing so, all
associated data is completely deleted. All members are informed about the action
and then removed from the organization.

By default, when an organization is deleted, all its associated
[journal entries](./journal.md) are also removed.

## Deleting profiles

When profiles are deleted, all their associated data is removed as well. In
order to keep the data it is recommended that profiles are instead
disabled/soft-deleted. This works as long as there is no regulation requiring
users to be able to delete their data.

By default, when a profile is deleted, all its associated
[journal entries](./journal.md) are also removed.
