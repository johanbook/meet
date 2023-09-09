import { IsArray, IsEmail } from "class-validator";

export class GetUserInfoListByEmailQuery {
  @IsArray()
  @IsEmail({}, { each: true })
  public readonly emails!: string[];
}
