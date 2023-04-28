import { IsAlpha, IsOptional, IsString, Length } from "class-validator";

export class UpdateProfileCommand {
  @IsOptional()
  @IsString()
  @Length(0, 1024)
  public readonly description?: string;

  @IsOptional()
  @IsAlpha()
  @Length(0, 128)
  public readonly name?: string;
}
