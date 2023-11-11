import { IsEmail } from "class-validator";

export class AddMemberToOrganizationViaEmailCommand {
  @IsEmail()
  email!: string;
}
