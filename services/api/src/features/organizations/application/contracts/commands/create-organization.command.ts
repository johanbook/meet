import { Length } from "class-validator";

export class CreateOrganizationCommand {
  @Length(0, 128)
  name!: string;
}
