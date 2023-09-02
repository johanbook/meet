import { IsEmail } from "class-validator";

export class UpdateEmailCommand {
  @IsEmail()
  public readonly email!: string;
}
