import { Length } from "class-validator";

export class UpdateOrganizationCommand {
  @Length(0, 128)
  name!: string;
}
