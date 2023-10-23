import { IsEmail } from "class-validator";

export class GetUserInfoByEmailQuery {
  @IsEmail()
  public readonly email!: string;
}
