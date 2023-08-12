import { ApiProperty } from "@nestjs/swagger";

export const BinaryFileArray = () =>
  ApiProperty({
    type: "array",
    items: {
      format: "binary",
      type: "string",
    },
  });
