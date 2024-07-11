# Journal

The software system comes with a built-in journal system, meaning all actions
taken by a user are stored in a journal which is persisted in the database.

## Guide

All commands are journaled by default, unless explicitly disabled for a command.

### Disabling journaling on a command-basis

Journaling can be disabled for a single command as done below

```ts
import { IsString, Length } from "class-validator";

import { NoJournal } from "src/core/journal";

@NoJournal()
export class CreateMonkeyCommand {
  @IsString()
  @Length(0, 1024)
  public readonly monkeyName!: string;
}
```
