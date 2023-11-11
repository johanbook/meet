# Organization

The system comes with built-in systems for profiles and organizations
(workspaces). Below the default implementation is outlined. This is not set in
stone and can be changed.

## Personal organizations

Each profile is created together with a **personal organization** in which only
that profile can be a member. Personal organizations act as a personal space
where a user can store resources they wish other users cannot access.

Personal organizations cannot be removed or leaved. This is to avoid leaving
profiles in a state without being associated to any organizations.

## Creating an organization

Any profile can by default create new organizations. Things to consider:

- Per organization subscription

## Removing a member

An organization admin can remove a member (but not their self). If that member
has this organization as active, their active organization is changed to their
personal one.

## Leaving an organization

It is possible for a profile to leave an organization if:

- They are not the last member of that organization
- They are not the last admin of that organization

## Deleting an organization

An organization can be deleted at **any time** by its admins. When doing so, all
associated is completely deleted. All members are informed about the action and
then removed from the organization. 
