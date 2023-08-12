import { ApiProperty } from "@nestjs/swagger";

export const BinaryFile = () =>
  ApiProperty({
    format: "binary",
    type: "string",
  });
